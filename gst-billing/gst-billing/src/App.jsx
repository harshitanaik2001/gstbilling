import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/common/Home';
import DashBoard from './components/common/DashBoard';
import AddNewBill from './components/gstbills/AddNewBill';
import AllBills from './components/gstbills/AllBills'
import ManageBills from './components/gstbills/ManageBills'
import Invoice from './components/gstbills/Invoice';
import PrivateRoute from './components/common/PrivateRoute';
import Signin from './components/common/Signin';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  const { login } = useSelector(state => state.Auth)

  useEffect(() => {
    if (login) {
      axios.interceptors.request.use(config => {
        const token = JSON.parse(localStorage.getItem("token"))
        config.headers.Authorization = `Bearer ${token}`
        return config
      }, error => Promise.reject(error))
    } else {
      localStorage.removeItem("token")
    }
  }, [login])

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

      <BrowserRouter>
        <Routes>

          <Route path='/sigin' element={<Signin />} />

          <Route element={<PrivateRoute />}>

            <Route path='/' element={<Home />}>
              <Route path='/dashboard' element={<DashBoard />} />
              <Route path='/bills' element={< AllBills />} />
              <Route path='/bills/manage' element={< ManageBills />} />
              <Route path='/add_new' element={<AddNewBill />} />
              <Route path='/update/:invoiceId' element={<AddNewBill />} />
              <Route path='/invoice/:custName/:invoiceId' element={<Invoice />} />
            </Route>

          </Route>

        </Routes>
      </BrowserRouter>
    </ >
  );
}

export default App;
