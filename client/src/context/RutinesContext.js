import React, { createContext, useReducer } from 'react';
import rutinesReducer from '../reducers/rutinesReducer.js';

export const RutinesContext = createContext();
export const RutinesDispatcher = createContext();

const defaultState = {
  render: { create: false, edit: false, default: true, search: false },
  rutines: [],
  editing: {},
  rutine: {
    name: '',
    description: '',
    exercices: [],
  },
  error: undefined,
  loading: false,
};

export function RutinesProvider(props) {
  const [state, dispatch] = useReducer(rutinesReducer, defaultState);

  return (
    <RutinesContext.Provider value={state}>
      <RutinesDispatcher.Provider value={dispatch}>
        {props.children}
      </RutinesDispatcher.Provider>
    </RutinesContext.Provider>
  );
}
