import React from 'react';
import { Outlet } from 'react-router'; // ✅ use react-router-dom
import Navbar from '../Pages/Home/Home/Shared/Navbar';
import Footer from '../Pages/Home/Home/Shared/Footer';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main content takes all available vertical space */}
      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default RootLayout;
