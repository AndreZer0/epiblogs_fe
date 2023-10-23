/** @format */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import Success from './pages/Success';
import Signup from './pages/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/'
          element={<Login />}
        />
        <Route
          path='/registration'
          element={<Signup />}
        />

        <Route element={<ProtectedRoutes />}>
          <Route
            path='/Home'
            element={<Home />}
          />
        </Route>

        <Route
          path='/success'
          element={<Success />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
