import pool from '$lib/db.js'

export async function load({ locals }) {
    let conn;
    try {
        conn = await pool.getConnection();
        
        const tables = await conn.query("SHOW TABLES");
        
        const tablesWithData = [];
        
        for (const table of tables) {
            const tableName = Object.values(table)[0];
            
            if (tableName == 'user' || tableName == 'games') continue;

            const rows = await conn.query(`SELECT * FROM ${tableName}`);

            const title = await conn.query(`SELECT title FROM games WHERE table_name = '${tableName}'`)

            const author = await conn.query(`SELECT author FROM games WHERE table_name = '${tableName}'`)
            
            tablesWithData.push({
                rows: rows,
                title: title[0].title,
                author: author[0].author,
                tableName: tableName
            });
        }
        
        return {
            tables: tablesWithData,
            user: locals.user || null
        };
    } catch (err) {
        console.error(err);
        return {
            tables: [],
            error: 'Failed to load tables from database',
            user: locals.user || null
        };
    } finally {
        if (conn) conn.release();
    } 
}