import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ExerciceProvider } from '../context/ExerciceContext';
import { RutinesProvider } from '../context/RutinesContext';
import { ProtectedRoute } from './ProtectedRoute';

import Login from './Login';
import Home from './Home';
import Rutines from './Rutines';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Login} />
        <ExerciceProvider>
          <ProtectedRoute path="/home" exact component={Home} />
          <RutinesProvider>
            <ProtectedRoute path="/trainings" exact component={Rutines} />
          </RutinesProvider>
        </ExerciceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
