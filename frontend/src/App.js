import 'bootstrap/dist/css/bootstrap.min.css';
import RequireAuth from 'components/RequireAuth';
import NotFound from 'features/404/NotFound';
import Dashboard from 'features/Dashboard/Dashboard';
import Home from 'features/Home/Home';
import Register from 'features/Register/Register';
import UpdateProfile from 'features/UpdateProfile/UpdateProfile';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from 'features/Chat/Chat';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
