import pool from '$lib/db.js';
import { fail } from '@sveltejs/kit';

const gameSessions = new Map();

function getGameState(sessionId, tableName) {
    const key = `${sessionId}_${tableName}`;
    if (!gameSessions.has(key)) {
        gameSessions.set(key, {
            correctIndex: null,
            guessesPure: [],
            guesses: [],
            initialized: false
        });
    }
    return gameSessions.get(key);
}

function resetGameState(sessionId, tableName) {
    const key = `${sessionId}_${tableName}`;
    gameSessions.set(key, {
        correctIndex: null,
        guessesPure: [],
        guesses: [],
        initialized: false
    });
    return gameSessions.get(key);
}

export async function load({ params, locals, cookies, url }) {
    const tableName = params.tableName;
    
    let sessionId = cookies.get('session_id');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        cookies.set('session_id', sessionId, { path: '/', maxAge: 60 * 60 * 24 });
    }

    const shouldReset = url.searchParams.get('reset') === 'true';
    
    let gameState;
    if (shouldReset) {
        gameState = resetGameState(sessionId, tableName);
    } else {
        gameState = getGameState(sessionId, tableName);
    }

    let conn;
    try {
        conn = await pool.getConnection();

        const rows = await conn.query(`SELECT * FROM ${tableName}`);

        const title = await conn.query(`SELECT title FROM games WHERE table_name = '${tableName}'`)

        if (gameState.correctIndex == null) {
            gameState.correctIndex = Math.floor(Math.random() * Object.keys(rows).length) + 1;
        }

        const correctRow = await conn.query(`SELECT * FROM ${tableName} WHERE id = ${gameState.correctIndex}`)

        const categories = Object.keys(rows[0]);
        categories.shift();

        const rowsWithComparison = rows.map((row) => {
            const comparisonRow = {};
            for (const key in row) {
                comparisonRow[key] = {
                    value: row[key],
                    isCorrect: row[key] === correctRow[0][key],
                    higher: typeof row[key] === 'number' ? row[key] > correctRow[0][key] : null
                };
            }
            return comparisonRow;
        });

        const guessedRows = [];
        for (const guess of gameState.guesses) {
            const matchingRow = rowsWithComparison.find(row => row.name.value === guess);
            if (matchingRow) {
                guessedRows.push(matchingRow);
            }
        }

        console.log(correctRow);

        const allNames = rows.map(row => row.name);

        return {
            user: locals.user,
            title: title[0].title,
            rows: rowsWithComparison,
            categories: categories,
            correctRow: correctRow,
            guesses: gameState.guesses,
            guessedRows: guessedRows,
            allNames: allNames
        }
        
    } catch (err) {
        console.log(err)
        return fail(500, { error: `Database error: ${err.message}` });
    } finally {
        if (conn) conn.release();
    }
}


export const actions = {
	default: async ({ request, params, cookies }) => {
        const data = await request.formData();
        const guess = data.get('guess');
        const tableName = params.tableName;

        const sessionId = cookies.get('session_id');
        if (!sessionId) {
            return fail(400, { error: 'No session found' });
        }

        const gameState = getGameState(sessionId, tableName);
        
        if (!gameState.guessesPure.includes(guess)) {
            gameState.guessesPure.push(guess);
            gameState.guesses = gameState.guessesPure.toReversed();
        }

        return { success: true };
	}
};
