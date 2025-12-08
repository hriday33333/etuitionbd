import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import RootLayout from '../layouts/RootLayout';
import Home from '../Pages/Home/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: 'login',
      },
      {
        path: 'register',
        
      },
    ],
  },
]);
