import 'bootstrap/dist/css/bootstrap.min.css';
import RequireAuth from 'components/RequireAuth';
import NotFound from 'features/404/NotFound';
import Dashboard from 'features/Dashboard/Dashboard';
import Home from 'features/Home/Home';
import Register from 'features/Register/Register';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getRedirect } from 'redux/selectors/authSelector';
import './App.scss';

function App() {
  return (
    <>
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
        <Route path="/register/*" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
