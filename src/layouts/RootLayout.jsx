import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const RootLayout = () => {
  return (
    <body className='max-w-7xl mx-auto '>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </body>
  );
};

export default RootLayout;
