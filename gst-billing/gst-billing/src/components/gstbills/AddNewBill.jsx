import React, { useEffect, useState } from 'react'
import { generateNewBill, getBillByID, updateBillByID } from '../../services'
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GrDocumentUpdate, GrPowerReset } from "react-icons/gr";
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineSave } from 'react-icons/ai';

const AddNewBill = () => {

    const bill = { custName: '', custContact: '', custEmail: '', custAddress: '', custGSTNO: '', billDescription: '', totalAmount: '' }

    const [data, setData] = useState(bill)
    const navigate = useNavigate()
    const { invoiceId } = useParams()

    useEffect(() => {
        if (invoiceId)
            getBillByID(invoiceId).then(response => {
                const obj = response.data
                if (obj.custContact === 0) obj['custContact'] = ''
                if (obj.custEmail === "string") obj['custEmail'] = ''
                if (obj.custAddress === "string") obj['custAddress'] = ''
                if (obj.custGSTNO === "string") obj['custGSTNO'] = ''
                setData(obj)
            }).catch(error => toast.error(error.message))
    }, [invoiceId])

    const handleChange = e => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const gstBillDTO = data
        if (!invoiceId) {
            generateNewBill(gstBillDTO).then(response => {
                toast.success(`New bill ${response.data.invoiceId} created`);
                setData(bill)
                navigate(`/invoice/${response.data.custName}/${response.data.invoiceId}`)
            }).catch(error => toast.error(error.message))
        } else {
            updateBillByID(invoiceId, gstBillDTO).then(response => {
                toast.success(`Bill ${response.data.invoiceId} updated successfully`)
                setData(bill)
                navigate(`/invoice/${response.data.custName}/${response.data.invoiceId}`)
            }).catch(error => toast.error(error.message))
        }
    }

    return (
        <div className='py-4'>
            <div className="card col-lg-6 col-md-9 col-11 mx-auto shadow-lg">
                <div className="card-body addnewbill">
                    {
                        invoiceId ? <h5 className="card-title text-center">Update Bill</h5> : <h5 className="card-title text-center">Create New Bill</h5>
                    }
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-5 mx-auto">
                                <div className="mb-3">
                                    <label htmlFor="custName" className="form-label">Customer Name</label>
                                    <input type="text" className="form-control" id="custName" value={data.custName} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="custContact" className="form-label">Contact</label>
                                    <input type="number" className="form-control" id="custContact" value={data.custContact} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="billDescription" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="billDescription" value={data.billDescription} onChange={handleChange}
                                        required style={{ minHeight: '125px', maxHeight: '125px' }} />
                                </div>
                            </div>
                            <div className="col-5 mx-auto">
                                <div className="mb-3">
                                    <label htmlFor="custAddress" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="custAddress" value={data.custAddress} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="custEmail" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="custEmail" value={data.custEmail} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="custGSTNO" className="form-label">GST No</label>
                                    <input type="text" className="form-control" id="custGSTNO" value={data.custGSTNO} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="totalAmount" className="form-label">Total Amount</label>
                                    <input type="number" className="form-control" id="totalAmount" value={data.totalAmount} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center my-3 gap-3">
                            {
                                !invoiceId ? <button type="submit" className="btn btn-success col-2"><AiOutlineSave /> Submit</button> :
                                    <>
                                        <Link className='btn btn-secondary col-2' to={'/bills'}><BiArrowBack /> Back</Link>
                                        <button type="submit" className="btn btn-success col-2"><GrDocumentUpdate /> Update</button>
                                    </>
                            }
                            <button className="btn btn-warning col-2" onClick={() => setData(bill)}><GrPowerReset /> Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewBill