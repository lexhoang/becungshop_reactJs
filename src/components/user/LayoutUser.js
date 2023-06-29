import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './header/index';
import Footer from './footer';

export default function LayoutUser() {
    return (
        <div className='bg-layout'>
            <Header />
            <div className='contain-outlet'>
                <Outlet className='content-outlet' />
            </div>

            <Footer />
        </div>
    )
}
