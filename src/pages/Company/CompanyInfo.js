import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { handleGetRequest } from "../../services/GetTemplate";
import { useDispatch } from "react-redux";
import img from "../../assets/jswall_assets/JS WALL/login1.png"
import { useHistory, useLocation } from "react-router-dom";
import ManageManagers from "./Manager/ManageManagers";
import ManageIndividuals from "./Individuals/ManageIndividuals";
import AddEditManagers from "./Manager/AddEditManagers";
import { baseURL } from "../../Config";

const CompanyInfo = () => {

    const location = useLocation();
    const data = location.state?.additionalProp;
    const dispatch = useDispatch()

    const [isActive, setIsActive] = useState(false)
    const [viewManager, setViewManager] = useState(false);
    const [viewIndividual, setViewIndividual] = useState(false);
    const [individualCount, setIndividualCount] = useState(0);
    const [managerCount, setManagerCount] = useState(0);

    const [displayManager, setDisplayManager] = useState(false);

    //Get All Count
    const getListNumberByCompanyId = async () => {

        setIsActive(true);

        const response = await dispatch(handleGetRequest(`/api/company/getById/${data?._id}`, true));
        if (response) {
            setIndividualCount(response?.data?.Individual);
            setManagerCount(response?.data?.Manager);
        }
        setIsActive(false);
    };

    useEffect(() => {
        getListNumberByCompanyId()
    }, [])


    const Header = () => {
        return (
            <>
                <h3 className="text-center" style={{ fontWeight: "700" }}>Add Manager</h3>
                <p className="text-center" style={{ fontWeight: "500", color: "gray", fontSize: "14px" }}>Enter the following details</p>
                <div className="mt-2">
                    <hr />
                </div>
            </>
        )
    }

    const handleChevron = () => {
        if (viewManager == false) {
            setViewManager(true)
        }
        else {

            setViewManager(false)
        }
    }

    const handleChevron2 = () => {
        if (viewIndividual == false) {
            setViewIndividual(true)
        }
        else {

            setViewIndividual(false)
        }
    }

    const handleAddManager = () => {
        setDisplayManager(true)
    }

    const onHideManager = (name) => {
        setDisplayManager(false);
    };


    return (

        <>
            <Dialog header={Header} visible={displayManager} style={{ width: '55vw' }} onHide={onHideManager}>
                <AddEditManagers
                    companyId={data?._id}
                    onHide={onHideManager}
                />
            </Dialog>

            <div className="card flex justify-content-between">
                <h2 style={{ fontWeight: "700", letterSpacing: "-1px", color: 'black' }}>Company Details</h2>
                {/* <div className='flex justify-content-between custom-alignment' style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="p-input-icon-left mr-3">
                        <i className="pi pi-search" />
                        <InputText
                            placeholder="Search"
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                            className="search-input"
                            style={{
                                background: 'transparent',
                                border: '1px solid gray',
                                borderRadius: '0',
                                color: 'black',
                            }}
                        />

                    </span>
                    <div className="">
                        <Button
                            label="Add New"
                            className="Save-Button"
                            icon="pi pi-plus"
                            onClick={() => {
                                handleDialog();
                            }}
                        />
                    </div>
                </div> */}
            </div>

            <br />
            <div className="scroll-container card flex justify-content-between pt-8 pb-8 pr-8 pl-8">
                <div className="flex flex-row mb-2" style={{ alignItems: "center" }}>
                    <img src={`${baseURL}/${data?.logo}` || img} width="140px" height="130px" style={{ border: "1px solid gray", borderRadius: "6px" }} />
                    <div className="flex flex-column">
                        <span style={{ color: 'black', fontSize: "18px" }} className="ml-6">{data?.companyName}</span>
                        <span style={{ color: '#009bcb', fontSize: "18px" }} className="ml-6 mt-2">Responsible Person</span>
                    </div>
                </div>
                <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="Add__New-Button">
                        <div className="text-center p-2">
                            <h5 className="mt-2"> Total Managers</h5>
                            <h3> {managerCount}</h3>
                        </div>
                    </div>
                    <div className="Add__New-Button ml-5 mr-4">
                        <div className="text-center p-2">
                            <h5 className="mt-2">Total Individuals</h5>
                            <h3> {individualCount}</h3>
                        </div>
                    </div>

                </div>
            </div>
            <br />

            {/* Manager */}
            <div className="scroll-container card flex justify-content-between">
                <div className="flex flex-row" style={{ alignItems: "center" }}>
                    <h4 style={{ color: 'black' }} className="ml-6 mt-1">Manager Names</h4>
                </div>
                <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>

                    <div className="">
                        <Button
                            type="button"
                            label="Add"
                            icon="pi pi-plus"
                            className="ml-4 View-Button"
                            onClick={() => {
                                handleAddManager();
                            }}
                        />
                    </div>
                    <div className="ml-4">
                        <Button
                            style={{ border: "none", background: "transparent", color: 'gray' }}
                            type="button"
                            label={
                                <>
                                    <i className={viewManager ? "pi pi-chevron-up" : "pi pi-chevron-down"} style={{ marginLeft: '4px' }} />
                                </>
                            }
                            onClick={() => {
                                handleChevron();
                            }}
                        />
                    </div>

                </div>

            </div>
            {viewManager ?
                <ManageManagers companyId={data?._id} />
                : null}


            {/* Individuals */}
            <div className="scroll-container card flex justify-content-between">
                <div className="flex flex-row" style={{ alignItems: "center" }}>
                    <h4 style={{ color: 'black' }} className="ml-6 mt-1">Individuals Names</h4>
                </div>
                <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="ml-4">
                        <Button
                            style={{ border: "none", background: "transparent", color: 'gray' }}
                            type="button"
                            label={
                                <>
                                    <i className={viewIndividual ? "pi pi-chevron-up" : "pi pi-chevron-down"} style={{ marginLeft: '4px' }} />
                                </>
                            }
                            onClick={() => {
                                handleChevron2();
                            }}
                        />
                    </div>

                </div>

            </div>
            {viewIndividual ?
                <ManageIndividuals companyId={data?._id} />
                : null}

        </>
    );
};

export default CompanyInfo