import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='bg-[#f6f4d2] min-h-screen'>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;