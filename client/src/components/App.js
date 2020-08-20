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
import CategoryExercices from './CategoryExercices';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Login} />
        <ExerciceProvider>
          <ProtectedRoute path="/home" exact component={Home} />
          <ProtectedRoute path="/logs" exact component={RegisterBook} />
          <ProtectedRoute
            path="/category"
            exact
            component={CategoryExercices}
          />
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
