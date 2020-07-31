const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_EXERCICES':
      return {
        exercices: [...action.payload],
        error: undefined,
        selected: undefined,
      };
    case 'FETCH_ERROR':
      return {
        exercices: [],
        error: action.payload[0],
        selected: undefined,
      };
    case 'SELECT_EXERCICE':
      return {
        exercices: [],
        error: undefined,
        selected: action.payload,
      };
    case 'DISCARD_SELECTION':
      return {
        exercices: [],
        error: undefined,
        selected: undefined,
      };
    default:
      return state;
  }
};
export default reducer;
