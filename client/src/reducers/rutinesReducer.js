const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEFAULT':
      return {
        render: { create: false, edit: false, default: true, search: false },
        rutines: [...state.rutines],
        rutine: {
          id: '',
          name: '',
          description: '',
          exercices: [],
        },
        error: undefined,
        loading: false,
      };
    case 'SET_SEARCH':
      return {
        render: {
          create: state.render.create,
          edit: state.render.edit,
          default: false,
          search: true,
        },
        rutines: [...state.rutines],
        rutine: state.rutine,
        error: undefined,
        loading: false,
      };
    case 'SET_CREATE':
      return {
        render: { create: true, edit: false, default: false, search: false },
        rutines: [...state.rutines],
        rutine: state.rutine,
        error: undefined,
        loading: false,
      };

    case 'SET_EDIT':
      return {
        render: { create: false, edit: true, default: false, search: false },
        rutines: [...state.rutines],
        rutine: {
          id: action.payload.id,
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
          id: '',
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
        rutines: [...state.rutines, ...action.payload],
        rutine: {
          id: '',
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
          ...state.rutines.filter(
            (rutine) => rutine.id !== action.payload[0].id
          ),
          ...action.payload,
        ],
        rutine: {
          id: '',
          name: '',
          description: '',
          exercices: [],
        },
        error: undefined,
        loading: false,
      };
    case 'DELETE_RUTINE':
      return {
        render: { create: false, edit: false, default: true, search: false },
        rutines: [
          ...state.rutines.filter((rutine) => rutine.id !== action.payload),
        ],
        rutine: {
          id: '',
          name: '',
          description: '',
          exercices: [],
        },
        error: undefined,
        loading: false,
      };
    case 'ADD_EXERCICE':
      return {
        render: {
          create: state.render.create,
          edit: state.render.edit,
          default: state.render.default,
          search: false,
        },
        rutines: [...state.rutines],
        rutine: {
          id: state.rutine.id,
          name: state.rutine.name,
          description: state.rutine.description,
          exercices: [...state.rutine.exercices, ...action.payload],
        },
        error: undefined,
        loading: false,
      };
    case 'REMOVE_EXERCICE':
      return {
        render: state.render,
        rutines: [...state.rutines],
        rutine: {
          id: state.rutine.id,
          name: state.rutine.name,
          description: state.rutine.description,
          exercices: [
            ...state.rutine.exercices.filter(
              (exercice) => exercice.id !== action.payload.id
            ),
          ],
        },
        error: undefined,
        loading: false,
      };
    case 'SELECT_RUTINE':
      return {
        render: state.render,
        rutines: [...state.rutines],
        rutine: action.payload,
        error: undefined,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
