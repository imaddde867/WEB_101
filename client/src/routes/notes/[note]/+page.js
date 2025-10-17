import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals, fetch, cookies }) => {
  if (!locals.user) {
    throw redirect(303, '/auth/login');
  }
  
  const noteId = params.note;
  const sessionId = cookies.get('sessionId');
  
  const response = await fetch(`http://server:7777/api/notes/${noteId}`, {
    headers: {
      'Cookie': `sessionId=${sessionId}`
    }
  });
  
  if (!response.ok) {
    throw redirect(303, '/notes');
  }
  
  const note = await response.json();
  
  return {
    note
  };
};
