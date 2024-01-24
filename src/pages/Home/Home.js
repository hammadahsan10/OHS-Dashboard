import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { FilterMatchMode } from "primereact/api";
import LoadingOverlay from "react-loading-overlay";
import { Triangle } from "react-loader-spinner";
import { InputText } from "primereact/inputtext";
import { handleGetRequest } from "../../services/GetTemplate";
import { useDispatch } from "react-redux";
import { confirmDialog } from "primereact/confirmdialog";
import { useHistory } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import Anaylytics from "../Analytics/Anaylytics";

const Home = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const username = localStorage.getItem('username')
    const role_Name = localStorage.getItem('role_Name')
    const companyId = localStorage.getItem('companyId')

    const [isActive, setIsActive] = useState(false)
    const [userdataId, setUserDataId] = useState();
    const [addEditUser, setAddEditUser] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [displayDialog2, setDisplayDialog2] = useState(false);
    const [viewAnalytics, setViewAnalytics] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const handleDeleteDialog = (id) => {
        console.log("id", id)
        confirmDialog({
            message: 'Are you sure you want to Delete this User ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleDeleteUser(id),
            reject: null
        });
    }

    const handleDeleteUser = async (id) => {

        setIsActive(true);
        console.log("delete id", id)
        // const response = await dispatch(handleDeleteRequest(`/api/user/delete/${rowData?._id}`, true, true));
        // if (response?.status === 200) {
        //     await getCompaniesList()
        // }

        setIsActive(false);
    }

    const nameTemplate = (rowData) => {

        const result = `${rowData.first_name} ${rowData?.last_name}`
        return (
            <>
                {result}
            </>
        )
    }

    const handleEditUsers = (rowData) => {
        setDisplayDialog(true);
        setAddEditUser(true);
        setUserDataId(rowData?._id);
    };

    const onHide = (name) => {
        setDisplayDialog(false);
        setAddEditUser(false);
    };

    const handleDialog = () => {
        history.push("./addeditcompanies")
        setDisplayDialog(true);
    };

    const onHide2 = (name) => {
        setDisplayDialog2(false);
    };

    const handleDialog2 = (item) => {
        console.log("item.name", item?.name)
        setDisplayDialog2(true);
    };


    const handleViewInfo = (id) => {
        console.log("id view", id)
        history.push("./companiesInfo")
    };

    //Get All Companies
    const getCompaniesList = async () => {

        setIsActive(true);

        const response = await dispatch(handleGetRequest("/api/company/getAll", true));
        if (response) {
            setAllUsers(response?.data);
        }
        setIsActive(false);
    };

    //Get All Individuals by Company Id
    const getIndividualsByCompany = async () => {

        setIsActive(true);

        const response = await dispatch(handleGetRequest(`/api/user/GetUserByCompany/${companyId}`, true));
        if (response) {
            setAllUsers(response?.data);
            console.log("allusers", response?.data)
        }
        setIsActive(false);
    };

    useEffect(() => {
        if (role_Name == "Admin") {
            getCompaniesList()
        }
        else if (role_Name == "Manager") {
            getIndividualsByCompany()
        }
    }, [role_Name])

    const Header = () => {
        return (
            <>
                <h3 className="pr-2 pl-2" style={{ fontWeight: "700" }}>{addEditUser ? "Edit User" : "Add User"}</h3>
                <div className="mt-2">
                    <hr />
                </div>
            </>
        )
    }

    const actionTemplate = () => {
        return (
            <>
                <Button
                    type="button"
                    label="View Details"
                    className="ml-4 Add-Button"
                // onClick={() => {
                //     handleAddManager();
                // }}
                />
            </>
        )
    }

    const actionTemplate2 = () => {
        return (
            <>
                <Button
                    type="button"
                    label="View Analytics"
                    className="ml-4 Add-Button"
                    onClick={() => {
                        handleViewAnalytics();
                    }}
                />
            </>
        )
    }

    const handleViewAnalytics = () => {
        setViewAnalytics(true)
    }

    const onHideAnalytics = () => {
        setViewAnalytics(false)
    }

    const items = [
        { name: "All" },
        { name: "Pending" },
        { name: "Completed" },
    ]

    return (

        <>
            <Dialog header="Update Company" visible={displayDialog2} style={{ width: '40vw' }} onHide={onHide2}>
                <form >
                    <div className="p-fluid formgrid grid pl-2 pr-2">
                        <div className="field col-12 md:col-4">
                            <label> Company Name </label>
                            <span className="Label__Required">*</span>
                            <InputText className="p-inputtext-sm" id="first_name" name="first_name" value='' onChange='' type="text" />
                        </div>

                        <div className='col-12 d-flex flex-row text-center mt-4 pb-2'>
                            <Button className="Save-Button ml-2" label="Update" icon="pi pi-plus" type="submit" />
                        </div>
                    </div>
                </form>
            </Dialog>

            <Dialog header="View Analytics" visible={viewAnalytics} style={{ width: '80vw', height:"100vh" }} onHide={onHideAnalytics}>
                <Anaylytics />
            </Dialog>


            <div className="card flex-column">
                <h2 style={{ fontWeight: "700", color: 'black' }}>Hey {username} !</h2>
                <p style={{ fontSize: "14px", color: 'gray' }}>Hope you are having a good day</p>
            </div>

            <br />

            <div className="dark-bg">

                <LoadingOverlay
                    active={isActive}
                    spinner={<Triangle
                        height="120"
                        width="120"
                        color="#009bcb"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />}

                    // text='Loading your content...'
                    styles={{
                        overlay: (base) => ({
                            ...base,
                            background: 'rgb(38 41 51 / 78%)',
                        })
                    }}
                >

                    {role_Name == "Admin" ? (
                        <>
                            <DataTable
                                header={
                                    <>
                                        <div className='flex card justify-content-between custom-alignment' style={{ display: 'flex', alignItems: 'center', background: "white" }}>
                                            <h2 style={{ fontWeight: "700", color: 'black' }}>
                                                Companies !
                                            </h2>

                                            <div className='flex justify-content-between custom-alignment' style={{ display: 'flex', alignItems: 'center' }}>
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
                                                {/* <div className="">
                                                    <Dropdown
                                                        options={items}
                                                        optionLabel="name"
                                                        optionValue="name"
                                                        placeholder="--Select--"
                                                    />
                                                </div> */}
                                            </div>

                                        </div>

                                    </>
                                }

                                responsive={true}
                                filters={filters}
                                globalFilterFields={[
                                    "companyName",
                                    "description",
                                    "phoneNo",
                                    "address",
                                ]}
                                responsiveLayout="scroll"
                                paginator
                                rows={20}
                                value={allUsers}
                                emptyMessage="No records found"
                                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                                rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                            >
                                <Column field="companyName" header="Company Name"></Column>
                                <Column field="description" header="Description"></Column>
                                <Column field="phoneNo" header="Contact No."></Column>
                                <Column field="address" header="Address"></Column>
                                {/* <Column field="" header="Managers"></Column>
                                <Column field="" header="Individuals"></Column>
                                <Column header="Action" body={actionTemplate} /> */}
                            </DataTable>
                        </>
                    )
                        :
                        role_Name == "Manager" ? (
                            <>
                                <DataTable
                                    header={
                                        <>
                                            <div className='flex card justify-content-between custom-alignment' style={{ display: 'flex', alignItems: 'center', background: "white" }}>
                                                <h2 style={{ fontWeight: "700", color: 'black' }}>
                                                    <span>Individuals <span style={{ fontWeight: "400", color: "#009bcb", fontSize: "16px" }}>(Under your management)</span></span>
                                                </h2>

                                                <div className='flex justify-content-between custom-alignment' style={{ display: 'flex', alignItems: 'center' }}>
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
                                                        <Dropdown
                                                            options={items}
                                                            optionLabel="name"
                                                            optionValue="name"
                                                            placeholder="--Select--"
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                        </>
                                    }

                                    responsive={true}
                                    filters={filters}
                                    globalFilterFields={[
                                        "username",
                                        "email",
                                        "department",
                                        "address",
                                    ]}
                                    responsiveLayout="scroll"
                                    paginator
                                    rows={20}
                                    value={allUsers}
                                    emptyMessage="No records found"
                                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                                    rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                                >
                                    <Column field="username" header="User Name"></Column>
                                    <Column field="email" header="Email"></Column>
                                    <Column field="department" header="Department"></Column>
                                    <Column header="Analytics" body={actionTemplate2} />
                                </DataTable>
                            </>
                        )
                            :
                            null}

                </LoadingOverlay>
            </div>


        </>
    );
};

export default Home