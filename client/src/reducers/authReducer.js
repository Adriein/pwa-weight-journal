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
    default:
      return state;
  }
};
export default reducer;
