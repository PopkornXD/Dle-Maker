import pool from './db.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function createUser(username, password) {
	let conn;
	try {
		conn = await pool.getConnection();
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const result = await conn.query(
			"INSERT INTO user (username, password) VALUES (?, ?)",
			[username, hashedPassword]
		);
		return { success: true, userId: result.insertId };
	} catch (err) {
		console.error(err);
		return { success: false, error: err.message };
	} finally {
		if (conn) conn.release();
	}
}

export async function verifyUser(username, password) {
	let conn;
	try {
		conn = await pool.getConnection();
		const users = await conn.query(
			"SELECT * FROM user WHERE username = ?",
			[username]
		);
		
		if (users.length == 0) {
			return { success: false, error: 'User not found' };
		}
		
		const user = users[0];
		const match = await bcrypt.compare(password, user.password);
		
		if (match) {
			return { 
				success: true, 
				user: { 
					id: user.id, 
					username: user.username
				} 
			};
		} else {
			return { success: false, error: 'Invalid password' };
		}
	} catch (err) {
		console.error(err);
		return { success: false, error: err.message };
	} finally {
		if (conn) conn.release();
	}
}

export async function getUserById(id) {
	let conn;
	try {
		conn = await pool.getConnection();
		const users = await conn.query(
			"SELECT id, username FROM user WHERE id = ?",
			[id]
		);
		
		if (users.length === 0) {
			return null;
		}
		
		return users[0];
	} catch (err) {
		console.error(err);
		return null;
	} finally {
		if (conn) conn.release();
	}
}
