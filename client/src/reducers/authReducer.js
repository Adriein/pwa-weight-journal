const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        username: action.payload.data[0].username,
        errormsg: undefined,
      };
    case 'LOGOUT':
      return {
        username: '',
        errormsg: undefined,
      };
    case 'LOGIN_ERROR':
      return {
        username: '',
        errormsg: action.error,
      };
    default:
      return state;
  }
};
export default reducer;
