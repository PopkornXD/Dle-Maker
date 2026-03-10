import { getUserById } from '$lib/auth.js';

export async function handle({ event, resolve }) {
	const session = event.cookies.get('session');
	
	if (session) {
		try {
			const sessionData = JSON.parse(session);
			const user = await getUserById(sessionData.id);
			
			if (user) {
				event.locals.user = user;
			}
		} catch (err) {
			console.error('Session error:', err);
			event.cookies.delete('session', { path: '/' });
		}
	}
	
	return await resolve(event);
}
