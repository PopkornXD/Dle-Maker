import pool from '$lib/db.js';


export async function load({ params, locals }) {
    const tableName = params.tableName;

    let conn;
    try {
        conn = await pool.getConnection();

        const rows = await conn.query(`SELECT * FROM ${tableName}`);

        const categories = Object.keys(rows[0]);

        const title = await conn.query(`SELECT title FROM games WHERE table_name = '${tableName}'`)

        console.log(title)

        return {
            user: locals.user,
            title: title[0].title,
            rows: rows,
            categories: categories
        }
        
    } catch (err) {
        console.log(err)
        return fail(500, { error: `Database error: ${err.message}` });
    } finally {
        if (conn) conn.release();
    }


}