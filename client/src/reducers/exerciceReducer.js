const beautifyName = (exericesArr) => {
  return exericesArr.map((exercice) => {
    exercice.name = exercice.name
      .split('')
      .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
      .join('');
    return exercice;
  });
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_EXERCICES':
      if (action.payload.length === 0) {
        return {
          exercices: [],
          error: 'No se han encontrado ejercicios...',
          loading: false,
          selected: undefined,
          categories: [],
        };
      }
      return {
        exercices: [...beautifyName(action.payload)],
        error: undefined,
        loading: false,
        selected: undefined,
        categories: [],
      };
    case 'LOADING':
      return {
        exercices: [],
        error: undefined,
        loading: true,
        selected: undefined,
        categories: [],
      };
    case 'FETCH_ERROR':
      return {
        exercices: [...state.exercices],
        error: action.payload[0],
        loading: false,
        selected: undefined,
        categories: [...state.categories],
      };
    case 'SELECT_EXERCICE':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: action.payload,
        categories: [],
      };
    case 'DISCARD_SELECTION':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: undefined,
        categories: [],
      };
    case 'FETCH_CATEGORIES':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: undefined,
        categories: [...action.payload],
      };
    case 'RESET':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: undefined,
        categories: [...state.categories],
      };
    default:
      return state;
  }
};
export default reducer;
