const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEFAULT':
      return {
        state: { create: false, edit: false, default: true, search: false },
        rutines: [...state.rutines],
        error: undefined,
        loading: false,
      };
    case 'SET_SEARCH':
      return {
        state: { create: true, edit: false, default: false, search: true },
        rutines: [...state.rutines],
        error: undefined,
        loading: false,
      };
    case 'SET_CREATE':
      return {
        state: { create: true, edit: false, default: false, search: false },
        rutines: [...state.rutines],
        error: undefined,
        loading: false,
      };
    case 'FETCH_RUTINES':
      return {
        state: { create: false, edit: false, default: true, search: false },
        rutines: [...action.payload],
        error: undefined,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
