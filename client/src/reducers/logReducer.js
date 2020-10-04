const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEFAULT':
      return {
        render: {
          default: true,
          create: false,
          showForm: false,
          serie: state.render.serie,
        },
        log: {},
        error: undefined,
        loading: false,
      };
    case 'SET_CREATE':
      return {
        render: {
          default: false,
          create: true,
          showForm: false,
          serie: state.render.serie,
        },
        log: action.payload,
        error: undefined,
        loading: false,
      };
    case 'ADD_SERIE':
      return {
        render: {
          default: false,
          create: true,
          showForm: true,
          serie: state.render.serie++,
        },
        log: state.log,
        error: undefined,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
