import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import RootLayout from '../layouts/RootLayout';
import About from '../Pages/About/About';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Contact from '../Pages/Contact/Contact';
import Home from '../Pages/Home/Home';
import Tuitions from '../Pages/Tuitions/Tuitions';
import Tutors from '../Pages/Tutors/Tutors';
import PrivateRoute from './PrivateRoute';

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
        path: '/Tuitions',
        element: <Tuitions></Tuitions>,
      },
      {
        path: '/Tutors',
        element: (
          <PrivateRoute>
            <Tutors></Tutors>
          </PrivateRoute>
        ),
      },
      {
        path: '/About',
        element: <About></About>,
      },
      {
        path: '/Contact',
        element: <Contact></Contact>,
      },
      {
        path: '',
        element: '',
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'register',
        element: <Register></Register>,
      },
    ],
  },
]);
