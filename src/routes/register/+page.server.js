import { createUser } from '$lib/auth.js';
import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/db.js';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

        let conn;
        try {
            conn = await pool.getConnection();

            const matchingUsernames = await conn.query('SELECT COUNT(*) FROM user WHERE username = ?', [username])

            if (matchingUsernames[0]['COUNT(*)'] > 0) {
                return fail(400, { error: 'Username already exists' })
            }
            
            const result = await createUser(username, password);
            
            if (!result.success) {
                return fail(400, { error: result.error });
            }

        } catch (err) {
            console.error(err);
            return fail(500, { error: `Database error: ${err.message}` });
        } finally {
            if (conn) conn.release();
        }
        
        throw redirect(303, '/login');
	}
};
