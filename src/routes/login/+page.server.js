import { verifyUser } from '$lib/auth.js';
import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		
		const result = await verifyUser(username, password);
		
		if (!result.success) {
			return fail(401, { error: result.error });
		}
		
		cookies.set('session', JSON.stringify({ id: result.user.id }), {
			path: '/'
		});
		
		throw redirect(303, '/');
	}
};
