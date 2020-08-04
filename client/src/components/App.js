import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ExerciceProvider } from '../context/ExerciceContext';
import { LogsProvider } from '../context/LogsContext';
import { ProtectedRoute } from './ProtectedRoute';

import Login from './Login';
import RegisterBook from './RegisterBook';
import History from './History';
import ExercicesForm from './ExercicesForm';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Login} />
        <ExerciceProvider>
          <ProtectedRoute path="/logs" exact component={RegisterBook} />
          <LogsProvider>
            <ProtectedRoute path="/history" exact component={History} />
          </LogsProvider>
          <ProtectedRoute
            path="/create-exercice"
            exact
            component={ExercicesForm}
          />
        </ExerciceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
