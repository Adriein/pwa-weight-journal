const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_LOGS':
      if (action.payload.length === 0) {
        return {
          logs: [],
          error: 'No se han encontrado registros...',
          loading: false,
        };
      }
      return {
        logs: [...action.payload],
        error: undefined,
        loading: false,
      };
    case 'LOADING':
      return {
        logs: [],
        error: undefined,
        loading: true,
      };
    case 'FETCH_ERROR':
      return {
        logs: [...state.logs],
        error: action.payload[0],
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
