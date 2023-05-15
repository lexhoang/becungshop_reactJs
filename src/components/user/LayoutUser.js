import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function LayoutUser() {
    return (
        <div>
            <Header />
            <div className='margin-header'>
                <Outlet />
            </div>

            {/* <Footer /> */}
        </div>
    )
}
