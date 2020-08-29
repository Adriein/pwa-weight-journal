import React, { createContext, useReducer } from 'react';
import exerciceReducer from '../reducers/exerciceReducer.js';

export const ExerciceContext = createContext();
export const DispatchContext = createContext();

const defaultState = {
  exercices: [],
  error: undefined,
  loading: false,
  selected: undefined,
  categories: [],
  exercicesByCategory: { category: 'Cargando...', exercices: [] },
  training: {
    isStarted: false,
    exercices: [],
    name: '',
  }
};
export function ExerciceProvider(props) {
  const [state, dispatch] = useReducer(exerciceReducer, defaultState);

  return (
    <ExerciceContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </ExerciceContext.Provider>
  );
}
