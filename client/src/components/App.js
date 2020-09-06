import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ExerciceProvider } from '../context/ExerciceContext';
import { ProtectedRoute } from './ProtectedRoute';

import Login from './Login';
import CategoryExercices from './CategoryExercices';
import Home from './Home';
import Trainings from './Trainings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <Route path="/" exact component={Login} />
        <ExerciceProvider>
          <ProtectedRoute path="/home" exact component={Home} />
          <ProtectedRoute
            path="/category"
            exact
            component={CategoryExercices}
          />
          <ProtectedRoute
            path="/trainings"
            exact
            component={Trainings}
          />
        </ExerciceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
