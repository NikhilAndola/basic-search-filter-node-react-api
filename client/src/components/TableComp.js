import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./tableComp.css"
import FilterIcon from '../icons/FilterIcon';

export const TableComp = () => {

    // const handleSelect = (e) => {
    //     console.log(e.target.value)
    // }

    const [dataFromServer, setDataFromServer] = useState([])

    const [sortQuery, setSortQuery] = useState('')

    const [showFilter, setShowFilter] = useState(false)

    const [inputVal, setInputVal] = useState({
        InitialAuth: false,
        Enhancement: false,
        Discharge: false,
        FinalAuthorization: false,
        PendingApproval: false,
        TpaQuery: false,
    })


    useEffect(() => {
        // console.log('hello axios')
        
        let url = sortQuery ? `http://localhost:4000?sortQuery=${sortQuery}` : `http://localhost:4000`;

        const getData = async () => {

            let response = await axios.get(url);
            let result = await response.data;
            // console.log("🚀 ~ file: TableComp.js ~ line 34 ~ getData ~ result", result)
            
            setDataFromServer(result)
        }
        getData()
    }, [inputVal])


    const onClickFilterHandle = (e) => {
        setShowFilter(!showFilter)
    }



    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value)
        if(e.target.name === "Initial Authorization"){
            // setInputVal({...inputVal, InitialAuth: !inputVal.InitialAuth})
            setInputVal({
                        InitialAuth: true,
                        Enhancement: false,
                        Discharge: false,
                        FinalAuthorization: false,
                        PendingApproval: false,
                        TpaQuery: false
                    })
            setSortQuery('initAuth')
        }
        if(e.target.name === "enhancement"){
            // setInputVal({...inputVal, Enhancement: !inputVal.Enhancement})
            setInputVal({
                InitialAuth: false,
                Enhancement: true,
                Discharge: false,
                FinalAuthorization: false,
                PendingApproval: false,
                TpaQuery: false
            })
            setSortQuery('enhance')
        }
        if(e.target.name === "Discharge") {
            // setInputVal({...inputVal, Discharge: !inputVal.Discharge})
            setInputVal({
                InitialAuth: false,
                Enhancement: false,
                Discharge: true,
                FinalAuthorization: false,
                PendingApproval: false,
                TpaQuery: false
            })
            setSortQuery('discharge')
        }
        if(e.target.name === "FinalAuth") {
            // setInputVal({...inputVal, FinalAuthorization: !inputVal.FinalAuthorization})
             setInputVal({
                InitialAuth: false,
                Enhancement: false,
                Discharge: false,
                FinalAuthorization: true,
                PendingApproval: false,
                TpaQuery: false
            })
            setSortQuery('finalAuth')
        }
        if(e.target.name === "PendingApproval") {
            // setInputVal({...inputVal, Discharge: !inputVal.PendingApproval})
             setInputVal({
                InitialAuth: false,
                Enhancement: false,
                Discharge: false,
                FinalAuthorization: false,
                PendingApproval: true,
                TpaQuery: false
            })
            setSortQuery('pending')

        }
        if(e.target.name === "tpaQuery") {
            // setInputVal({...inputVal, Discharge: !inputVal.TpaQuery})
             setInputVal({
                InitialAuth: false,
                Enhancement: false,
                Discharge: false,
                FinalAuthorization: false,
                PendingApproval: false,
                TpaQuery: true
            })
            setSortQuery('tpaQuery')
        }
    }

  return (
    <div style={{width: "80%"}}>

        <div className='AbsoluteParent'>
            <div className="filterIconClass">
                <FilterIcon className="iconFilter" onClick={onClickFilterHandle} />
                <span>Filter</span>
            </div>

                { showFilter &&
                    <div className="filterDropdown">
                        <div className="fltrHeads">
                            <span>Stage</span>
                        </div>
                            <div className="stageFlex">
                                <div className='inputSpace'>
                                    <input type="checkbox" name="Initial Authorization" checked={inputVal.InitialAuth} onChange={handleChange}/>
                                    <label>Initial Authorization</label>
                                </div>

                                <div className='inputSpace'>
                                    <input type="checkbox" name="enhancement" checked={inputVal.Enhancement} onChange={handleChange}/>
                                    <label>Enhancement</label>
                                </div>

                                <div className='inputSpace'>
                                    <input type="checkbox" name="Discharge" checked={inputVal.Discharge} onChange={handleChange}/>
                                    <label>Discharge</label>
                                </div>

                                <div className='inputSpace'>
                                    <input type="checkbox" name="FinalAuth" checked={inputVal.FinalAuthorization} onChange={handleChange}/>
                                    <label>Final Authorization</label>
                                </div>
                            </div>
                            
                            <div className="fltrHeads">
                                <span>Status</span>
                            </div>
                            <div className="statusFlex">
                                <div className='inputSpace'>
                                    <input type="checkbox" name="PendingApproval" checked={inputVal.PendingApproval} onChange={handleChange}/>
                                    <label>Pending Approval</label>
                                </div>

                                <div className='inputSpace'>
                                    <input type="checkbox" name="tpaQuery" checked={inputVal.TpaQuery} onChange={handleChange}/>
                                    <label>TPA </label>
                                </div>
                            </div>
                    </div>
                }

        </div>

        <div>
            <hr/>
        </div>

        <table style={{width: "100%"}}>
            <thead>
                <tr>
                    <th>Claim ID</th>
                    <th>Name</th>
                    <th>Ailment</th>
                    <th>SLA</th>
                    <th>P-TAT</th>
                    <th>Stage</th>
                    <th>Status</th>
                    <th>Approved Amount</th>
                    <th>Hospital</th>
                </tr>
            </thead>
            <tbody>
                {dataFromServer.map((item,index)=> {
                   return   <tr key={index}>
                                <td>{item.claimId}</td>
                                <td>{item.name}</td>
                                <td>{item.ailment}</td>
                                <td>{item.sla}</td>
                                <td>{item.pTat || "-"}</td>
                                <td>{item.stage}</td>
                                <td>{item.status}</td>
                                <td>{item.approvedAmount}</td>
                                <td>{item.hospital}</td>
                            </tr>
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
