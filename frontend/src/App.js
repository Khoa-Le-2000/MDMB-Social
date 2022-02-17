import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import React from 'react';
import RequireAuth from 'components/RequireAuth';
import Dashboard from 'features/Dashboard/Dashboard';
import NotFound from 'features/404/NotFound';
import Home from 'features/Home/Home';
import Register from 'features/Register/Register';
import { useSelector } from 'react-redux';
import { getRedirect } from 'redux/selectors/authSelector';

function App() {
  const isRedirectRegister = useSelector(getRedirect);
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
        <Route
          path="/register/*"
          element={<Register isRedirectRegister={isRedirectRegister} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
