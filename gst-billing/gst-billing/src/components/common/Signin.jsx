import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { GrPowerReset } from 'react-icons/gr'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signinRequest } from '../../redux/slice/AuthSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const Signin = () => {

    const data = { userName: '', password: '' }
    const [user, setUser] = useState(data)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { id, value } = e.target
        setUser({ ...user, [id]: value })
    }

    const handleSignIn = (e) => {
        e.preventDefault()
        const signInRequest = { ...user }
        dispatch(signinRequest(signInRequest))
            .then(unwrapResult)
            .then(() => {
                navigate('/dashboard')
                toast.success("Sign in successfully")
            }).catch(error => toast.error(error.message))
    }

    return (
        <div className='siginback d-flex align-items-center' style={{ height: '100vh' }}>
            <div className="container">
                <div className="card mx-auto shadow-lg rounded col-sm-12 col-md-10 col-lg-8 col-xl-6 signin">
                    <h5 className="card-title display-6 text-center mt-1 mb-0">Sign In</h5>
                    <hr />
                    <div className="card-body mx-4 ">
                        <form onSubmit={handleSignIn} className="mx-auto row d-flex gap-4 ">
                            <div className="form-group form-floating col-10 mx-auto">
                                <input type="text" className="form-control" id="userName" placeholder='Enter User Name' required
                                    value={user.userName} onChange={handleChange}
                                />
                                <label htmlFor="userName" className='ms-2'>User Name : </label>
                            </div>
                            <div className="form-group form-floating col-10 mx-auto">
                                <input type="password" className="form-control" id="password" placeholder='Enter Password' required
                                    value={user.password} onChange={handleChange}
                                />
                                <label htmlFor="password" className='ms-2'>Password : </label>
                            </div>
                            <div className="gap-3 d-flex justify-content-center mt-3 mb-2">
                                <button className="btn btn-success" type="submit"><FaSignInAlt />  Sign In</button>
                                <button className="btn btn-danger" onClick={() => setUser(data)}><GrPowerReset />  Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin