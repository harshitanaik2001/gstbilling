import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

const Home = () => {
    return (
        <div>
            <NavBar />
            <div className='outlet' style={{ minHeight: '92vh' }}>
                <Outlet />
            </div>
        </div >
    )
}

export default Home