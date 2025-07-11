import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Home/Home/Shared/Navbar';

const RootLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default RootLayout;