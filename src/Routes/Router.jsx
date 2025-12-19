import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import DashBordLayout from '../layouts/DashBordLayout';
import RootLayout from '../layouts/RootLayout';
import Login from '../Pages/Auth/Login/Login';
import Register from '../Pages/Auth/Register/Register';
import AppliedTutors from '../Pages/Dashboard/AppliedTutors/AppliedTutors';
import ApproveTuitor from '../Pages/Dashboard/ApproveTuitor/ApproveTuitor';
import Payment from '../Pages/Dashboard/Payment/Payment';
import PaymentCancelled from '../Pages/Dashboard/Payment/PaymentCancelled';
import PaymentSuccess from '../Pages/Dashboard/Payment/PaymentSuccess';
import PaymentHistory from '../Pages/Dashboard/PaymentHistory/PaymentHistory';
import MyTuitions from '../Pages/Dashboard/StudentsDashboard/MyTuitions';
import UsersManagment from '../Pages/Dashboard/UsersManagment/UsersManagment';
import GoogleMap from '../Pages/GoogleMap/GoogleMap';
import Home from '../Pages/Home/Home';
import PostTuition from '../Pages/PostTuition/PostTuition';
import Tuitor from '../Pages/Tuitor/Tuitor';
import AdminRoute from './AdminRoute';
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
        loader: () => fetch('/serviceCenter.json').then((res) => res.json()),
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
  {
    path: 'dashboard',
    element: (
      <PrivetRouter>
        <DashBordLayout></DashBordLayout>
      </PrivetRouter>
    ),
    children: [
      {
        path: 'my-tuitions',
        element: <MyTuitions></MyTuitions>,
      },
      {
        path: 'payment/:studentId',
        element: <Payment></Payment>,
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: 'payment-cancelled',
        element: <PaymentCancelled></PaymentCancelled>,
      },
      {
        path: 'payment-history',
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: 'approve-tuitor',
        element: (
          <AdminRoute>
            <ApproveTuitor></ApproveTuitor>,
          </AdminRoute>
        ),
      },
      {
        path: 'applied-tutors',
        element: (
          <AdminRoute>
            <AppliedTutors></AppliedTutors>
          </AdminRoute>
        ),
      },
      {
        path: 'users-managment',
        element: (
          <AdminRoute>
            <UsersManagment></UsersManagment>,
          </AdminRoute>
        ),
      },
    ],
  },
]);
