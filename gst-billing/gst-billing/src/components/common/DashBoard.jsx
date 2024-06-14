import React, { useEffect, useState } from 'react'
import { getAllTotals } from '../../services'
import { toast } from 'react-toastify'
import { Pie, PieChart, Sector } from 'recharts'
import { Link } from 'react-router-dom'
import { LuIndianRupee } from 'react-icons/lu'

const DashBoard = () => {

    const [data, setData] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        allTotals()
    }, [])

    const allTotals = () => {
        getAllTotals().then(response => {
            const respObj = response.data

            delete Object.assign(respObj, { Amount: respObj.allAmount })['allAmount'];
            delete Object.assign(respObj, { CGST: respObj.allCgstAmount })['allCgstAmount'];
            delete Object.assign(respObj, { SGST: respObj.allSgstAmount })['allSgstAmount'];
            delete Object.assign(respObj, { Total: respObj.allTotalAmount })['allTotalAmount'];

            const final = Object.entries(respObj).map(([key, value]) => ({ key, value }))
            setData(final)
        }).catch(error => toast.error(error.message))
    }

    const onPieEnter = (a, index) => {
        setActiveIndex(index)
    }

    const renderActiveShape = ({ cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, key }) => {
        const RADIAN = Math.PI / 180;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}> {payload.key} </text>
                <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
                <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 8} fill={fill} />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${key}: Rs ${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    }

    return (
        <div className='pt-4'>
            <div className='card col-xxl-8 col-md-10 mx-auto dashboard' style={{ minHeight: '85vh' }} >
                <div className="card-header">
                    <h2 className='text-center mb-0'>All Amounts</h2>
                </div>
                <div className='card-body d-lg-flex flex-sm-row align-items-center justify-content-sm-center'>
                    <div className='col-8' >
                        <PieChart width={750} height={500}>
                            <Pie data={data} dataKey="value" nameKey="key" cx="50%" cy="50%" outerRadius={190} innerRadius={80} fill="#3197f3"
                                paddingAngle={1} onMouseEnter={onPieEnter} activeIndex={activeIndex} activeShape={renderActiveShape}
                            />
                        </PieChart>
                    </div>
                    <div className='col-4 p-3'>
                        {
                            data.length !== 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover text-center table-danger table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Amount Type</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {
                                                data.map((bill, index) => (
                                                    <tr key={index}>
                                                        <td>{bill.key}</td>
                                                        <td><LuIndianRupee /> {bill.value}</td>
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
        </div>
    )
}

export default DashBoard