// import { Suspense } from "react";
// import { PATH_NAME } from "../configs/pathName";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Link
// } from "react-router-dom";

// const Login = Lazy(() => import("features/Login/Login.jsx"));

// const routesConfig = [
//   {
//     exact: true,
//     path: PATH_NAME.LOGIN
//     component: () => <Login />,
//   },
// ];

// const renderRoutes = (routes) => {
//   return (
//     <>
//       {
//         routes ? (
//           <Suspense fallback={<div />}>
//             <Routes>

//             </Routes>
//           </Suspense>
//         ) : null
//       }
//     </>
//   );
// }
