import { beautifyName } from '../helpers';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_EXERCICES':
      if (action.payload.length === 0) {
        return {
          exercices: [],
          error: 'No se han encontrado ejercicios...',
          loading: false,
          selected: [],
          categories: [...state.categories],
          exercicesByCategory: { category: 'Cargando...', exercices: [] },
          training: state.training,
        };
      }
      return {
        exercices: [...beautifyName(action.payload)],
        error: undefined,
        loading: false,
        selected: [],
        categories: [...state.categories],
        exercicesByCategory: { category: 'Cargando...', exercices: [] },
        training: state.training,
      };
    case 'LOADING':
      return {
        exercices: [],
        error: undefined,
        loading: true,
        selected: [...state.selected],
        categories: [...state.categories],
        exercicesByCategory: { category: 'Cargando...', exercices: [] },
        training: state.training,
      };
    case 'FETCH_ERROR':
      return {
        exercices: [...state.exercices],
        error: action.payload[0],
        loading: false,
        selected: [],
        categories: [...state.categories],
        exercicesByCategory: { category: 'Cargando...', exercices: [] },
        training: state.training,
      };
    case 'SELECT_EXERCICE':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: [...state.selected, ...action.payload],
        categories: [...state.categories],
        exercicesByCategory: {
          category: state.exercicesByCategory.category,
          exercices: [...state.exercicesByCategory.exercices],
        },
        training: {
          isStarted: true,
          exercices: [...state.training.exercices, action.payload],
          name: '',
        },
      };
    case 'DISCARD_SELECTION':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: [],
        categories: [...state.categories],
        exercicesByCategory: { category: 'Cargando...', exercices: [] },
        training: state.training,
      };
    case 'FETCH_CATEGORIES':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: [...state.selected],
        categories: [...action.payload],
        exercicesByCategory: { category: 'Cargando...', exercices: [] },
        training: state.training,
      };
    case 'FETCH_CATEGORY':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: [...state.selected],
        categories: [...state.categories],
        exercicesByCategory: action.payload,
        training: state.training,
      };
    case 'RESET':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: [],
        categories: [...state.categories],
        exercicesByCategory: { category: 'Cargando...', exercices: [] },
        training: state.training,
      };
    case 'START_TRAINING':
      return {
        exercices: [],
        error: undefined,
        loading: false,
        selected: [],
        categories: [...state.categories],
        exercicesByCategory: { category: 'Cargando...', exercices: [] },
        training: {
          isStarted: true,
          exercices: [],
          name: '',
        },
      };
    default:
      return state;
  }
};
export default reducer;
