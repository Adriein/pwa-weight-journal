const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEFAULT':
      return {
        render: { create: false, edit: false, default: true, search: false },
        rutines: [...state.rutines],
        rutine: {
          name: '',
          description: '',
          exercices: [],
        },
        error: undefined,
        loading: false,
      };
    case 'SET_SEARCH':
      return {
        render: { create: true, edit: false, default: false, search: true },
        rutines: [...state.rutines],
        rutine: {
          name: '',
          description: '',
          exercices: [],
        },
        error: undefined,
        loading: false,
      };
    case 'SET_CREATE':
      return {
        render: { create: true, edit: false, default: false, search: false },
        rutines: [...state.rutines],
        rutine: {
          name: '',
          description: '',
          exercices: [],
        },
        error: undefined,
        loading: false,
      };

    case 'SET_EDIT':
      return {
        render: { create: false, edit: true, default: false, search: false },
        rutines: [...state.rutines],
        rutine: {
          name: action.payload.name,
          description: action.payload.description,
          exercices: [...action.payload.exercices],
        },
        error: undefined,
        loading: false,
      };
    case 'FETCH_RUTINES':
      return {
        render: { create: false, edit: false, default: true, search: false },
        rutines: [...action.payload],
        rutine: {
          name: '',
          description: '',
          exercices: [],
        },
        error: undefined,
        loading: false,
      };

    case 'SAVE_RUTINE':
      return {
        render: { create: false, edit: false, default: true, search: false },
        rutines: [...state.rutines, action.payload],
        rutine: {
          name: '',
          description: '',
          exercices: [],
        },
        error: undefined,
        loading: false,
      };

    case 'UPDATE_RUTINE':
      return {
        render: { create: false, edit: false, default: true, search: false },
        rutines: [
          ...state.rutines.filter((rutine) => rutine.id !== action.payload.id),
          action.payload,
        ],
        rutine: {
          name: '',
          description: '',
          exercices: [],
        },
        error: undefined,
        loading: false,
      };
    case 'ADD_EXERCICE':
      return {
        render: state.render,
        rutines: [...state.rutines],
        rutine: {
          name: state.rutine.name,
          description: state.rutine.description,
          exercices: [...state.rutine.exercices, ...action.payload],
        },
        error: undefined,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
