import React from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
    return (
        <div className='bg-[#f6f4d2] min-h-screen'>
            <ToastContainer position='top-center'/>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;