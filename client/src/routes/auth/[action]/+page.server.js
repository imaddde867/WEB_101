import { redirect, fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, params, cookies, fetch }) => {
    const action = params.action;
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    
    if (!email || !password) {
      return fail(400, { error: 'Email and password are required' });
    }
    
    const endpoint = action === 'login' 
      ? 'http://server:7777/api/auth/login'
      : 'http://server:7777/api/auth/register';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      return fail(response.status, { error: error.message || 'Authentication failed' });
    }
    
    const result = await response.json();
    
    // Set the session cookie
    cookies.set('sessionId', result.sessionId, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    
    throw redirect(303, '/notes');
  }
};
