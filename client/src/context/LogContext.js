import React, { createContext, useReducer } from 'react';
import logReducer from '../reducers/logReducer.js';

export const LogContext = createContext();
export const LogDispatcherContext = createContext();

const defaultState = {
  render: { default: true, create: false },
  logs: [],
  error: undefined,
  loading: false,
};

export function LogProvider(props) {
  const [state, dispatch] = useReducer(logReducer, defaultState);

  return (
    <LogContext.Provider value={state}>
      <LogDispatcherContext.Provider value={dispatch}>
        {props.children}
      </LogDispatcherContext.Provider>
    </LogContext.Provider>
  );
}
