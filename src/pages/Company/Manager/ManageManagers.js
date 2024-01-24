import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { Triangle } from 'react-loader-spinner'
import LoadingOverlay from 'react-loading-overlay'
import { handleGetRequest } from '../../../services/GetTemplate'
import { useDispatch } from 'react-redux'
import { SplitButton } from 'primereact/splitbutton'
import AddEditManagers from './AddEditManagers'
import { Dialog } from 'primereact/dialog'
import { handleDeleteRequest } from '../../../services/DeleteTemplate'
import { confirmDialog } from 'primereact/confirmdialog'
import { baseURL } from '../../../Config'

const ManageManagers = ({ companyId }) => {

    console.log("companyId", companyId)
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [displayDialog, setDisplayDialog] = useState(false)
    const [editable, setEditable] = useState(false)
    const [rowObject, setRowObject] = useState()

    //Get All Users
    const getManagersByCompany = async () => {

        setIsActive(true);

        const response = await dispatch(handleGetRequest(`/api/user/GetManagerByCompany/${companyId}`, true));
        console.log("response", response)
        if (response) {
            setAllUsers(response?.data);
        }
        setIsActive(false);
    };

    useEffect(() => {
        if (companyId) {
            getManagersByCompany()
        }
    }, [companyId])

    const handleEditDialog = (rowData) => {
        setDisplayDialog(true)
        setEditable(true)
        setRowObject(rowData)
        console.log("handleEditDialog rowData", rowData);
    };

    const onHide = () =>
    {
        setDisplayDialog(false)
    }

    const handleDeleteDialog = (rowData) => {
        console.log("handleDeleteDialog rowData", rowData);
        confirmDialog({
            message: 'Are you sure you want to Delete this Manager ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleDeleteManager(rowData?._id),
            reject: null
        });
    };

    const handleDeleteManager = async (id) => {

        setIsActive(true);
        console.log("delete id", id)
        const response = await dispatch(handleDeleteRequest(`/api/user/delete/${id}`, true, true));
        if (response) {
            await getManagersByCompany()
        }

        setIsActive(false);
    }


    const items = [
        {
            label: "Edit",
            command: handleEditDialog,
        },
        {
            label: "Delete",
            command: handleDeleteDialog,
        },
    ];

    const actionTemplate = (rowData) => {
        const dynamicItems = items.map((item) => ({
            ...item,
            command: () => item.command(rowData),
        }));

        return (
            <>
                <SplitButton model={dynamicItems} className="p-button-text custom-button-css" ></SplitButton>
            </>
        );
    };

    const Header = () => {
        return (
            <>
                <h3 className="text-center" style={{ fontWeight: "700" }}>Edit Manager</h3>
                <p className="text-center" style={{ fontWeight: "500", color: "gray", fontSize: "14px" }}>Enter the following details</p>
                <div className="mt-2">
                    <hr />
                </div>
            </>
        )
    }

    const imageTemplate = (rowData) => {

        return (
            <>
                {rowData?.image ?
                    <img
                        src={`${baseURL}/${rowData?.image}`}
                        width="80px" height="80px"
                        alt="logo Image"
                        style={{border:"1px solid gray", borderRadius:"4px"}}
                    />
                    :
                    "N/A"}
            </>
        )
    }

    return (
        <div>
            <Dialog header={Header} visible={displayDialog} style={{ width: '55vw' }} onHide={onHide}>
                <AddEditManagers
                    rowObject={rowObject}
                    onHide= {onHide}
                    editable={editable}
                    getManagersByCompany={getManagersByCompany}
                />
            </Dialog>
            <div className="card dark-bg">
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
                    <DataTable
                        responsive={true}
                        responsiveLayout="scroll"
                        paginator
                        rows={20}
                        value={allUsers}
                        emptyMessage="No records found"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    >
                         <Column body={imageTemplate} header="Logo"></Column>
                        <Column field="username" header="Name"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="department" header="Department"></Column>
                        <Column header="Action" body={actionTemplate} />
                    </DataTable>
                </LoadingOverlay>
            </div>
        </div>
    )
}

export default ManageManagers
