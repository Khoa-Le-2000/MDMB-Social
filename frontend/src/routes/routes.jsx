// import { Fragment, lazy, Suspense } from 'react';
// import { PATH_NAME } from '../configs/pathName';
// import { Routes, Route, useRoutes } from 'react-router-dom';
// import MainLayout from 'layouts/MainLayout';
// import Home from 'features/Home/Home';
// import NotFound from 'features/404/NotFound';
// import { Navigate, Outlet } from 'react-router-dom';

// const Login = lazy(() => import('features/Login/Login'));

// const Router = ({ isLoggedIn }) =>
//   useRoutes([
//     {
//       path: '/',
//       element: isLoggedIn ? <Home /> : <Navigate to="/login" />,
//       children: [
//         { path: '/app', element: <Navigate to="/" /> },
//         { path: '/login', element: <Login /> },
//       ],
//     },
//     {
//       path: '/',
//       element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app" />,
//       children: [
//         { path: 'login', element: <Login /> },
//         { path: '/', element: <Navigate to="/login" /> },
//       ],
//     },
//   ]);

// export default Router;
