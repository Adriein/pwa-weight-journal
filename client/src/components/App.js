import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ExerciceProvider } from '../context/ExerciceContext';
import { RutinesProvider } from '../context/RutinesContext';
import { LogProvider } from '../context/LogContext';
import { ProtectedRoute } from './ProtectedRoute';

import Login from './Login';
import Home from './Home';
import Rutines from './Rutines';
import Logs from './Logs';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Login} />
        <ExerciceProvider>
          <ProtectedRoute path="/home" exact component={Home} />
          <RutinesProvider>
            <ProtectedRoute path="/trainings" exact component={Rutines} />
            <LogProvider>
              <ProtectedRoute path="/logs" exact component={Logs} />
            </LogProvider>
          </RutinesProvider>
        </ExerciceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
