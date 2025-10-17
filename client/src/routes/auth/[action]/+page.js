export const load = async ({ params }) => {
  const action = params.action;
  
  if (action !== 'login' && action !== 'register') {
    return {
      status: 404,
      error: new Error('Not found')
    };
  }
  
  return {
    action
  };
};
