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
          categories: [...state.categories],
          exercicesByCategory: []
        };
      }
      return {
        exercices: [...beautifyName(action.payload)],
        error: undefined,
        loading: false,
        selected: undefined,
        categories: [...state.categories],
        exercicesByCategory: []
      };
    case 'LOADING':
      return {
        exercices: [],
        error: undefined,
        loading: true,
        selected: undefined,
        categories: [...state.categories],
        exercicesByCategory: []
      };
    case 'FETCH_ERROR':
      return {
        exercices: [...state.exercices],
        error: action.payload[0],
        loading: false,
        selected: undefined,
        categories: [...state.categories],
        exercicesByCategory: []
      };
    case 'SELECT_EXERCICE':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: action.payload,
        categories: [...state.categories],
        exercicesByCategory: []
      };
    case 'DISCARD_SELECTION':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: undefined,
        categories: [...state.categories],
        exercicesByCategory: []
      };
    case 'FETCH_CATEGORIES':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: undefined,
        categories: [...action.payload],
        exercicesByCategory: []
      };
      case 'FETCH_CATEGORY':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: undefined,
        categories: [...state.categories],
        exercicesByCategory: [...action.payload]
      };
    case 'RESET':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: undefined,
        categories: [...state.categories],
        exercicesByCategory: []
      };
    default:
      return state;
  }
};
export default reducer;
