import pool from '$lib/db.js';
import { fail, redirect } from '@sveltejs/kit';


export const actions = {
    default: async ({ request, locals }) => {
		const data = await request.formData();
        const title = data.get('title');
        const dataset = data.get('dataset');

        if (!locals.user) {
            return fail(401, { error: 'You must be logged in to create a game' });
        }

        const lines = dataset.trim().split('\n');
        
        if (lines.length < 2) {
            return fail(400, { error: 'Dataset must have at least a header row and one data row' });
        }

        let columnNames = lines[0].split('\t').map(col => col.trim());

        columnNames = columnNames.map(col => 
            col.toLowerCase().replace(/[^a-z0-9]/g, '_')
        );

        
        const dataRows = lines.slice(1).map(line => 
            line.split('\t').map(cell => cell.trim())
        );


        let conn;
        try {
            conn = await pool.getConnection();
            
            const tableName = title.toLowerCase().replace(/[^a-z0-9]/g, '_');
            
            const columnDefinitions = columnNames.map((col, index) => {
                
                const isNumber = dataRows.every(row => {
                    const value = row[index];
                    return !isNaN(parseFloat(value));
                });

                let dataType = 'VARCHAR(255)';

                if (isNumber){
                    dataType = 'FLOAT';
                }
        
                return `${col} ${dataType}`;
            }).join(', ');
            
            await conn.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions})`);

            
            const placeholders = columnNames.map(() => '?').join(', ');
            const insertQuery = `INSERT INTO ${tableName} (${columnNames.join(', ')}) VALUES (${placeholders})`;
            
            for (const row of dataRows) {
                await conn.query(insertQuery, row);
            }
            
            await conn.query(
                'INSERT INTO games (title, author, table_name) VALUES (?, ?, ?)',
                [title, locals.user.username, tableName]
            );
            
		    return { success: true, message: `Successfully created ${title}` };

            
        } catch (err) {
            console.error(err);
            return fail(500, { error: `Database error: ${err.message}` });
        } finally {
            if (conn) conn.release();
        }
    }
}