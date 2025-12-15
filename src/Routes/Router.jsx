import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import RootLayout from '../layouts/RootLayout';
import Login from '../Pages/Auth/Login/Login';
import Register from '../Pages/Auth/Register/Register';
import GoogleMap from '../Pages/GoogleMap/GoogleMap';
import Home from '../Pages/Home/Home';
import PostTuition from '../Pages/PostTuition/PostTuition';
import Tuitor from '../Pages/Tuitor/Tuitor';
import PrivetRouter from './PrivetRouter';

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
        path: 'tuitor',
        element: (
          <PrivetRouter>
            <Tuitor></Tuitor>
          </PrivetRouter>
        ),
      },
      {
        path: 'post_tuition',
        element: (
          <PrivetRouter>
            <PostTuition></PostTuition>
          </PrivetRouter>
        ),
        loader: () => fetch('/serviceCenter.json').then((res) => res.json()),
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
        element: <Login></Login>,
      },
      {
        path: 'register',
        element: <Register></Register>,
      },
    ],
  },
]);
