import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RxExit } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/slice/AuthSlice'

const NavBar = () => {

    const dispatch = useDispatch()

    return (
        <>
            <div className='sticky-top'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary mainNav">
                    <div className="container-fluid">
                        <Link className='btn navbar-brand p-0' to='/dashboard'>
                            <img src={require('../../images/FullStackLogo.png')} alt='FULLSTACK_LOGO' width="90" height="60" className="d-inline-block align-text-top" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                                <li className="nav-item">
                                    <NavLink to={'/dashboard'} className="nav-link" >Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/bills'} className="nav-link" >Manage Bills</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/add_new'} className="nav-link" >Add New Bills</NavLink>
                                </li>
                            </ul>
                            <ul className='navbar-nav gap-3'>
                                <li className='nav-item'>
                                    <Link to={'/sigin'} className="btn btn-danger" onClick={() => dispatch(logOut())}><RxExit /> Log Out</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavBar