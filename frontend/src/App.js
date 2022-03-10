import 'bootstrap/dist/css/bootstrap.min.css';
import RequireAuth from 'components/RequireAuth';
import 'emoji-mart/css/emoji-mart.css';
import NotFound from 'features/404/NotFound';
import ChatOverView from 'features/ChatOverView/ChatOverView';
import WindowContent from 'features/ChatOverView/ChatWindow/WindowContent/WindowContent';
import WindowEmpty from 'features/ChatOverView/ChatWindow/WindowEmpty/WindowEmpty';
import Dashboard from 'features/Dashboard/Dashboard';
import Home from 'features/Home/Home';
import Register from 'features/Register/Register';
import UpdateProfile from 'features/UpdateProfile/UpdateProfile';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';

function App() {
  const location = useLocation();

  return (
    <>
      <Routes location={location}>
        <Route path="/" element={<Home />}>
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route
          path="/chat"
          element={
            <RequireAuth>
              <ChatOverView />
            </RequireAuth>
          }
        >
          <Route index element={<WindowEmpty />} />
          <Route path=":roomId" element={<WindowContent />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
