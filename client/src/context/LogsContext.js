import React, { createContext, useReducer } from 'react';
import logsReducer from '../reducers/logsReducer.js';

export const LogsContext = createContext();
export const DispatchContext = createContext();

const defaultState = {
  logs: [],
  error: undefined,
  loading: false,
};

export function LogsProvider(props) {
  const [state, dispatch] = useReducer(logsReducer, defaultState);

  return (
    <LogsContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </LogsContext.Provider>
  );
}
