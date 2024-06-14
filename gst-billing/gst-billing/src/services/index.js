import axios from "axios"
import { APPLICATION_URI } from "../constants"

export const generateNewBill = (gstBillDTO) => {
    return axios.post(APPLICATION_URI.BILL + '/', gstBillDTO)
}

export const getBillByID = (invoiceId) => {
    return axios.get(APPLICATION_URI.BILL + `/${invoiceId}`)
}

export const getAllBills = () => {
    return axios.get(APPLICATION_URI.BILL + '/')
}

export const deleteBillByID = (invoiceId) => {
    return axios.delete(APPLICATION_URI.BILL + `/${invoiceId}`)
}

export const sendData = (pdf, invoiceId) => {
    const form = new FormData();
    form.append('pdf', pdf)
    return axios.post(APPLICATION_URI.BILL + `/mail-invoice/${invoiceId}`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export const sortBills = (queryValue) => {
    return axios.get(APPLICATION_URI.BILL + '/sort', { params: { value: queryValue } })
}

export const searchByAnyInput = (input) => {
    return axios.get(APPLICATION_URI.BILL + `/search/${input}`)
}

export const signIn = (signInRequest) => {
    return axios.post(APPLICATION_URI.AUTH + '/signin', signInRequest)
}

export const getAllTotals = () => {
    return axios.get(APPLICATION_URI.BILL + '/all-totals')
}

export const updateBillByID = (invoiceId , gstBillDTO) =>{
    return axios.put(APPLICATION_URI.BILL+ `/${invoiceId}` , gstBillDTO)
}