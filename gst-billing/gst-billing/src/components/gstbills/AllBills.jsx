import React, { useEffect, useState } from 'react'
import { deleteBillByID, getAllBills } from '../../services'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import BillNavbar from './BillNavbar'
import { VscFilePdf } from "react-icons/vsc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrDocumentUpdate } from 'react-icons/gr'

const AllBills = () => {

    const [bills, setBills] = useState([])

    useEffect(() => {
        allBills()
    }, [])

    const allBills = () => {
        getAllBills().then(response => setBills(response.data)).catch(error => toast.error(error.message))
    }

    const handleDelete = (invoiceId) => {
        deleteBillByID(invoiceId).then(() => {
            toast.success(`Invoice ${invoiceId} deleted`)
            allBills()
        }).catch(error => toast.error(error.message))
    }

    const dataFromNav = (data) => {
        setBills(data)
    }

    return (
        <div className='py-4'>
            <div className="card col-md-10 col-12 mx-auto shadow-lg">
                <div className="card-body allBills">
                    <BillNavbar dataFromNav={dataFromNav} />
                    {
                        bills.length !== 0 ? (
                            <div className="d-flex justify-content-center table-responsive mt-4 mb-2 mx-3 overflow-auto" style={{ maxHeight: '74vh', scrollbarWidth: 'none' }}>
                                <table className="table table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col">Invoice ID</th>
                                            <th scope="col">Customer Name</th>
                                            <th scope="col">Description</th>
                                            <th scope='col'>Total Amount</th>
                                            <th scope='col'>Bill Date</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {
                                            bills.map((bill, index) => (
                                                <tr key={index}>
                                                    <td>{bill.invoiceId}</td>
                                                    <td>{bill.custName}</td>
                                                    <td>{bill.billDescription}</td>
                                                    <td>{bill.totalAmount}</td>
                                                    <td>{bill.billDate}</td>
                                                    <td>
                                                        <div className='d-flex justify-content-center gap-4'>
                                                            <Link to={`/invoice/${bill.custName}/${bill.invoiceId}`} className='btn btn-primary'><VscFilePdf /> View</Link>
                                                            <Link to={`/update/${bill.invoiceId}`} className='btn btn-warning'><GrDocumentUpdate /> Update</Link>
                                                            <button className='btn btn-danger' onClick={() => handleDelete(bill.invoiceId)}><RiDeleteBin6Line /> Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className='d-flex flex-column align-items-center gap-5' style={{ marginTop: '100px', marginBottom: '100px' }}>
                                <h5>No bills available. Create new bill</h5>
                                <Link to={'/add_new'} className='btn btn-outline-primary'>Create New Bill</Link>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default AllBills