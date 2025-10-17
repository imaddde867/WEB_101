import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, fetch, cookies }) => {
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }
  
  const sessionId = cookies.get('sessionId');
  const response = await fetch('http://server:7777/api/notes', {
    headers: {
      'Cookie': `sessionId=${sessionId}`
    }
  });
  
  if (!response.ok) {
    return {
      notes: []
    };
  }
  
  const notes = await response.json();
  
  return {
    notes
  };
};

export const actions = {
  create: async ({ request, cookies, fetch }) => {
    const data = await request.formData();
    const content = data.get('content');
    
    if (!content) {
      return { error: 'Content is required' };
    }
    
    const sessionId = cookies.get('sessionId');
    const response = await fetch('http://server:7777/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `sessionId=${sessionId}`
      },
      body: JSON.stringify({ content })
    });
    
    if (!response.ok) {
      return { error: 'Failed to create note' };
    }
    
    return { success: true };
  },
  
  logout: async ({ cookies }) => {
    cookies.delete('sessionId', { path: '/' });
    throw redirect(303, '/');
  }
};
