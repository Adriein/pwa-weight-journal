const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEFAULT':
      return {
        render: { default: true, create: false },
        logs: [],
        error: undefined,
        loading: false,
      };
    case 'SET_SEARCH':
      return {
        render: { default: true, create: false },
        logs: [],
        error: undefined,
        loading: false,
      };
    case 'SET_CREATE':
      return {
        render: { default: true, create: false },
        logs: [],
        error: undefined,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
