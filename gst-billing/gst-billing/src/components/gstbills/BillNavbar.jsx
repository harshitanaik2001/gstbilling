import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { searchByAnyInput, sortBills } from '../../services'

const BillNavbar = ({ dataFromNav }) => {
    const [input, setInput] = useState('')

    const sortRecords = (queryValue) => {
        sortBills(queryValue).then(response => dataFromNav(response.data)).catch(error => toast.error(error.message))
    }

    const search = () => {
        searchByAnyInput(input).then(response => {
            dataFromNav(response.data)
            setInput('')
        }).catch(error => toast.error(error.message))
    }

    return (
        <nav className="navbar navbar-expand-xl shadow-lg billNav">
            <div className="container">
                <button className="navbar-brand btn" onClick={() => sortRecords()}>Sort</button>
                <button className="navbar-toggler " data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0 gap-2">
                        <li className="nav-item">
                            <div className="btn-group border" role="group" aria-label="Basic example1">
                                <button className="btn " onClick={() => sortRecords()}><AiOutlineSortAscending /></button>
                                <div className='d-flex align-items-center'>Invoice ID</div>
                                <button className="btn " onClick={() => sortRecords('invoiceIDDesc')}><AiOutlineSortDescending /></button>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="btn-group border" role="group" aria-label="Basic example2">
                                <button className="btn " onClick={() => sortRecords('custNameAsc')}><AiOutlineSortAscending /></button>
                                <div className='d-flex align-items-center'>Cust Name</div>
                                <button className="btn " onClick={() => sortRecords('custNameDesc')}><AiOutlineSortDescending /></button>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="btn-group border" role="group" aria-label="Basic example">
                                <button className="btn " onClick={() => sortRecords('billDateAsc')}><AiOutlineSortAscending /></button>
                                <div className='d-flex align-items-center'>Bill Date</div>
                                <button className="btn " onClick={() => sortRecords('billDateDesc')}><AiOutlineSortDescending /></button>
                            </div>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <input className="form-control me-sm-2 " type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search Bill" />
                        <button className="btn btn-info my-2 my-sm-0 col-4" onClick={() => search()}><BsSearch /> Search</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default BillNavbar