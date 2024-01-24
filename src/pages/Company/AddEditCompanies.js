import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import LoadingOverlay from 'react-loading-overlay';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { handleGetRequest } from '../../services/GetTemplate';
import { useDispatch } from 'react-redux';
import { handlePostRequest } from '../../services/PostTemplate';
import { Dialog } from 'primereact/dialog';
import { handlePutRequest } from '../../services/PutTemplate';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { FileUpload } from 'primereact/fileupload';
import img from '../../assets/jswall_assets/JS WALL/login1.png'
import AddEditManagers from './Manager/AddEditManagers';

const AddEditCompanies = () => {

    const userId = localStorage.getItem("userId")
    const [saveBtnLoading, setSaveBtnLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [userInput, setUserInput] = useState("")
    const [allDepartments, setAllDepartments] = useState([])
    const [displayDialog, setDisplayDialog] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([]);

    const history = useHistory()
    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        companyName: Yup.mixed().required("This field is required."),

    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {
            companyName: "",
            description: "",
            phoneNo: "",
            address: "",

        },

        onSubmit: async (data) => {

        },
    });

    const AddCompany = async () => {

        const obj = {
            companyName: formik.values.companyName,
            description: formik.values.description,
            phoneNo: formik.values.phoneNo,
            address: formik.values.address,
            logo: selectedFiles[0]?.base64,
        }

        setSaveBtnLoading(true);
        const response = await dispatch(handlePostRequest(obj, "/api/company/create", false, true));
        setSaveBtnLoading(false)
    }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleDialog = () => {
        setDisplayDialog(true)
    }


    const onHideManager = () => {
        setDisplayDialog(false)
    }

    const Header2 = () => {
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

    //File Upload Function
    const handleFileUpload = (event) => {
        const files = Array.from(event.files);

        const updatedFiles = files.map((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setSelectedFiles(() => [
                 
                    { file_extension: file.type, base64: base64String, name: file.name, objectURL: file.objectURL || null }
                ]);
            };
            reader.readAsDataURL(file);

            return file;
        });
    };


    return (
        <>

            <Dialog header={Header2} visible={displayDialog} style={{ width: '55vw' }} onHide={onHideManager}>
                <AddEditManagers />
            </Dialog>
            <div className="card flex justify-content-between">
                <h2 style={{ fontWeight: "700", color: 'black' }}>New Company</h2>
                <div className='flex justify-content-between custom-alignment' style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="">
                        <Button
                            type='button'
                            label="Save"
                            className="Save-Button"
                            onClick={AddCompany}
                        />
                    </div>
                </div>
            </div>

            <br />
            <div className="card">
                <div className="field col-12 md:col-12 pl-6 pb-2 pr-6">
                    <div className='flex flex-row'>
                        <div className='flex flex-column'>
                            <img
                                src={`data:image/svg+xml,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61 61" width="100px" height="100px">
      <path d="M48.2917 12.7083V48.2917H12.7083V12.7083H48.2917ZM48.2917 7.625H12.7083C9.9125 7.625 7.625 9.9125 7.625 12.7083V48.2917C7.625 51.0875 9.9125 53.375 12.7083 53.375H48.2917C51.0875 53.375 53.375 51.0875 53.375 48.2917V12.7083C53.375 9.9125 51.0875 7.625 48.2917 7.625ZM35.9392 30.1442L28.3142 39.9804L22.875 33.3975L15.25 43.2083H45.75L35.9392 30.1442Z" fill="black" fill-opacity="0.4"/>
    </svg>
  `}
                                width="100px" height="100px"
                                alt="SVG Image"
                                className="ml-3"
                            />
                            <FileUpload
                                auto
                                mode="basic"
                                chooseLabel="Choose File"
                                className="p-mt-2"
                                onSelect={handleFileUpload}
                                accept="image/*"
                            />
                        </div>
                        <div className='flex flex-column'>
                            <div className="field col-12 md:col-12 pl-6 pr-6 mt-3">
                                <label> Enter Company Name </label>
                                <InputText className="p-inputtext-sm md:col-12 mt-2" id="companyName" name="companyName" value={formik.values.companyName} onChange={formik.handleChange} type="text" />
                            </div>
                        </div>
                        <div className='flex flex-column'>
                            <div className="field col-12 md:col-12 pl-6 pr-6 mt-3">
                                <label> Enter Company Name </label>
                                <InputText className="p-inputtext-sm md:col-12 mt-2" id="companyName" name="companyName" value={formik.values.companyName} onChange={formik.handleChange} type="text" />
                            </div>
                        </div>

                        <div className='flex flex-column'>
                            <div className="field col-12 md:col-12 pl-6 pr-6 mt-3">
                                <label> Enter Company Name </label>
                                <InputText className="p-inputtext-sm md:col-12 mt-2" id="companyName" name="companyName" value={formik.values.companyName} onChange={formik.handleChange} type="text" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="card flex justify-content-between">
                <h5 style={{ fontWeight: "500", color: 'black' }}>Add Manager</h5>
                <div className='flex justify-content-between custom-alignment' style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="">
                        <Button
                            icon="pi pi-plus"
                            label="Add"
                            className="View-Button"
                            onClick={() => {
                                handleDialog();
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="card flex justify-content-between">
                <h5 style={{ fontWeight: "500", color: 'black' }}>Add Individuals</h5>
                <div className='flex justify-content-between custom-alignment' style={{ display: 'flex', alignItems: 'center' }}>

                </div>
            </div> */}

        </>
    )
}

export default AddEditCompanies