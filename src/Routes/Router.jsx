import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import RootLayout from '../layouts/RootLayout';
import GoogleMap from '../Pages/GoogleMap/GoogleMap';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Auth/Login/Login';
import Register from '../Pages/Auth/Register/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: 'map',
        element: <GoogleMap></GoogleMap>,
        loader: () => fetch('/serviceCenter.json').then((res) => res.json()),
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: 'login',
        element:<Login></Login>
      },
      {
        path: 'register',
        element:<Register></Register>
      },
    ],
  },
]);
