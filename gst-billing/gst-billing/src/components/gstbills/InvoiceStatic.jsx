import React from 'react'
import { BsTelephone, BsGlobe2 } from 'react-icons/bs'
import { TfiEmail } from 'react-icons/tfi'
import { SlLocationPin } from 'react-icons/sl'
import { TbDeviceLandlinePhone } from 'react-icons/tb'

const InvoiceStatic = ({ data }) => {
    return (
        <>
            <div className="d-flex">
                <div className="col-2  d-flex justify-content-center">
                    <img src={require('../../images/FullStackLogo.png')} alt='FULL STACK_LOGO' width="130" height="100" />
                </div>
                <div className='col-10 d-flex justify-content-center align-items-center'>
                    <h2 className='mb-0'>Full Stack Java Developer Private Limited</h2>
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <section className="ms-4 col-4">
                    <div className="d-flex gap-2">
                        <div className="d-flex align-items-center">
                            <SlLocationPin />
                        </div>
                        <span>
                            Inspiria Mall,
                            <br />
                            Level- 04,
                            <br />
                            Nr. Bhakti Shakti Chowk,
                            <br />
                            Nigdi, Pune- 411044
                        </span>
                    </div>
                    <div className='d-flex gap-2'>
                        <div className="d-flex align-items-center">
                            <BsTelephone />
                        </div>
                        +91 9623639693
                    </div>
                    <div className='d-flex gap-2'>
                        <div className="d-flex align-items-center">
                            <TbDeviceLandlinePhone />
                        </div>
                        <span>0 9623639693 </span>
                    </div>
                    <div className='d-flex gap-2'>
                        <div className="d-flex align-items-center">
                            <TfiEmail />
                        </div>
                        <span>contact@fullstackjavadeveloper.in</span>
                    </div>
                    <div className='d-flex gap-2'>
                        <div className="d-flex align-items-center">
                            <BsGlobe2 />
                        </div>
                        <span>www.fullstackjavadeveloper.in</span>
                    </div>
                    <div className="mt-3 mb-2">
                        <b className='border border-4 rounded-pill p-2'>GSTIN : AAZZBBCCEE</b>
                    </div>
                </section>
                <section className="col-3 ps-3">
                    <h3 className='mb-3'>Invoice</h3>
                    <p className='border border-4 rounded text-center py-2'>Invoice No : <b><i>{data.invoiceId}</i></b></p>
                    <p>Date : <b><i>{data.billDate}</i></b></p>
                </section>
            </div>
        </>
    )
}

export default InvoiceStatic