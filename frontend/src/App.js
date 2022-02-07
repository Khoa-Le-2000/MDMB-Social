import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import Login from './features/Login/Login';
import RequireAuth from 'components/RequireAuth';
import Dashboard from 'features/Dashboard/Dashboard';
import NotFound from 'features/404/NotFound';
import Home from 'features/Home/Home';
import MainLayout from 'layouts/MainLayout';

function App() {
  return (
    <>
      <MainLayout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
