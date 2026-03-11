import pool from "$lib/db.js"
import { fail } from "@sveltejs/kit";

export async function load({ locals }) {
    let conn;
    try {
        conn = await pool.getConnection();

        let madeGamesInfo = await conn.query('SELECT * FROM games WHERE author = ?', [locals.user.username]);

        if (locals.user.username == 'ADMIN') {
            madeGamesInfo = await conn.query('SELECT * FROM games')
        }

        const gamesMadeTitles = [];
        for (const game of madeGamesInfo) {
            gamesMadeTitles.push(game.table_name);
        }

        console.log(gamesMadeTitles);


        const tables = await conn.query("SHOW TABLES");
        
        const tablesWithData = [];
        
        for (const table of tables) {
            const tableName = Object.values(table)[0];
            
            if (!gamesMadeTitles.includes(tableName)) continue;

            const rows = await conn.query(`SELECT * FROM ${tableName}`);

            const categories = Object.keys(rows[0]);
            categories.shift()


            const title = await conn.query(`SELECT title FROM games WHERE table_name = '${tableName}'`)

            const author = await conn.query(`SELECT author FROM games WHERE table_name = '${tableName}'`)
            
            tablesWithData.push({
                categories: categories,
                rows: rows,
                title: title[0].title,
                author: author[0].author,
                tableName: tableName
            });
        }


        return {
            user: locals.user,
            tables: tablesWithData
        }

    } catch (err) {
        console.error(err);
        return fail(500, { error: `Database error: ${err.message}` });
    } finally {
        if (conn) conn.release();
    }
}