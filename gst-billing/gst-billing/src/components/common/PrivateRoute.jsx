import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {

    const { login } = useSelector(state => state.Auth)

    return login ? <Outlet /> : <Navigate to={'/sigin'} />
}

export default PrivateRoute