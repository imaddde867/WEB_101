export const handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get('sessionId');
  
  if (sessionId) {
    const response = await fetch(`http://server:7777/api/auth/me`, {
      headers: {
        'Cookie': `sessionId=${sessionId}`
      }
    });
    
    if (response.ok) {
      event.locals.user = await response.json();
    } else {
      event.cookies.delete('sessionId', { path: '/' });
    }
  }
  
  return await resolve(event);
};
