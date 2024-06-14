import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBillByID, sendData } from '../../services'
import InvoiceStatic from './InvoiceStatic'
import { toast } from 'react-toastify'
import { BsPrinter } from 'react-icons/bs'
import { TfiEmail } from 'react-icons/tfi'
import { useReactToPrint } from 'react-to-print'
import { LuIndianRupee } from 'react-icons/lu'
import { BiArrowBack } from 'react-icons/bi'
import html2pdf from 'html2pdf.js'

const Invoice = () => {

    const print = useRef()
    const { invoiceId } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {
        getBillByID(invoiceId).then(response => {
            setData(response.data)
        }).catch(error => toast.error(error.message))
    }, [invoiceId])

    const savePdf = () => {
        const options = {
            margin: 0,
            filename: `${data.custName} Invoice ${data.invoiceId}`,
            image: { type: 'jpeg', quality: 1 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(options).from(print.current).toPdf().get('pdf').then(pdf => {
            sendData(pdf.output('blob'), data.invoiceId)
                .then(response => {
                    toast.success(response.data)
                    navigate(-1)
                }).catch(error => toast.error(error.message))
        });
    }

    const generatePdf = useReactToPrint({
        content: () => print.current,
        documentTitle: `${data.custName} Invoice ${data.invoiceId}`
    })

    return (
        <div>
            <div className='py-4'>
                <div className="card col-xxl-7 col-md-10 col-12 mx-auto shadow-lg print">
                    <div ref={print} id='print' >
                        <div className="card-body pt-3 mx-2 image">
                            <InvoiceStatic data={{ ...data }} />
                            <div className="d-flex ms-4 mt-3">
                                <span>
                                    Bill To,<br />
                                    <b>{data.custName}</b> <br />
                                    {!!data.custAddress ? <>{data.custAddress} <br /></> : <></>}
                                    {data.custContact !== 0 ? <>{data.custContact} <br /></> : <></>}
                                    {!!data.custEmail ? <>{data.custEmail} <br /></> : <></>}
                                    {!!data.custGSTNO ? <>{data.custGSTNO} <br /></> : <></>}
                                </span>
                            </div>
                            <div className="d-flex justify-content-center table-responsive col-10 mx-auto my-4">
                                <table className="table text-center">
                                    <thead>
                                        <tr>
                                            <th style={{ backgroundColor: '#fcca90' }}>Sr No</th>
                                            <th style={{ backgroundColor: '#fcca90' }}>Items & Description</th>
                                            <th style={{ backgroundColor: '#fcca90' }}>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        <tr>
                                            <td style={{ backgroundColor: '#fff0de' }}>1</td>
                                            <td style={{ backgroundColor: '#fff0de' }}>{data.billDescription}</td>
                                            <td style={{ backgroundColor: '#fff0de' }}>{data.amount}</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                            <div className="d-flex justify-content-end col-11">
                                <div className="col-4 table-responsive">
                                    <table className="table text-center table-borderless table-light">
                                        <tbody>
                                            <tr>
                                                <td><h6 className='mb-0'>Amount : </h6></td>
                                                <td><LuIndianRupee />{data.amount}</td>
                                            </tr>
                                            <tr>
                                                <td><h6 className='mb-0'>CGST (9%) : </h6></td>
                                                <td><LuIndianRupee />{data.cgstAmount}</td>
                                            </tr>
                                            <tr>
                                                <td><h6 className='mb-0'>SGST (9%) : </h6></td>
                                                <td><LuIndianRupee />{data.sgstAmount}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: 'lightgrey' }}><h6 className='mb-0'>Total Amount : </h6></td>
                                                <td style={{ backgroundColor: 'lightgrey' }}><strong><LuIndianRupee />{data.totalAmount}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mb-3" >
                                <div className="d-flex flex-column gap-3">
                                    <img src={require('../../images/FullStackLogo.png')} alt='stamp' style={{ width: '220px', height: '130px' }} />
                                    <div className='d-flex flex-column' >
                                        <b className='text-center'>Mr. AA</b>
                                        <b className='text-center'>Director</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-center gap-5">
                        <button className='btn btn-secondary col-2' onClick={() => navigate(-1)}><BiArrowBack /> Back</button>
                        {
                            !!data.custEmail ? <button className='btn btn-success col-2' onClick={savePdf}><TfiEmail /> Send to Mail</button> : <></>
                        }
                        <button className='btn btn-primary col-2' onClick={generatePdf}><BsPrinter /> Print</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Invoice