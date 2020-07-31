import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ExerciceProvider } from '../context/ExerciceContext';
import { ProtectedRoute } from './ProtectedRoute';

import Login from './Login';
import RegisterBook from './RegisterBook'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Login} />
        <ExerciceProvider>
          <ProtectedRoute path="/logs" exact component={RegisterBook} />
        </ExerciceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
