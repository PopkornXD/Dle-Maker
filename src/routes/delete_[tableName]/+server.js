import pool from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

export async function POST({ params }) {

    const tableName = params.tableName;
    let conn;
    
    try {
        conn = await pool.getConnection();

        await conn.query(`DELETE FROM games WHERE table_name = ?`, [tableName]);

        await conn.query(`DROP TABLE IF EXISTS ${tableName}`);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        console.error('Error deleting game:', err);
        return new Response(JSON.stringify({ error: `Database error: ${err.message}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        if (conn) conn.release();
    }
}