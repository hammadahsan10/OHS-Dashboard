import React, { useState, useEffect } from "react";
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog";
import { handleGetRequest } from "../../services/GetTemplate";
import { useDispatch } from "react-redux";
import { baseURL } from "../../Config";
import UpdateProfile from "./UpdateProfile";

const MyProfile = () => {

    const dispatch = useDispatch()
    const userId = localStorage.getItem("userId")

    const [allUsers, setAllUsers] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [displayDialog, setDisplayDialog] = useState(false)

    //Get All Users
    const getProfileById = async () => {

        setIsActive(true);
        const response = await dispatch(handleGetRequest(`/api/user/getById/${userId}`, true));
        if (response) {
            setAllUsers(response?.data);
        }
        setIsActive(false);
    };

    const handleChange = () => {
        setDisplayDialog(true)
    }

    const onHide = () => {
        setDisplayDialog(false)
    }

    const Header = () => {
        return (
            <>
                <h3 className="text-center" style={{ fontWeight: "700" }}>Edit Profile</h3>
                <p className="text-center" style={{ fontWeight: "500", color: "gray", fontSize: "14px" }}>Enter the following details</p>
                <div className="mt-2">
                    <hr />
                </div>
            </>
        )
    }

    useEffect(() => {
        if (userId) {
            getProfileById()
        }
    }, [userId])

    return (
        <>

            <Dialog header={Header} visible={displayDialog} style={{ width: '55vw' }} onHide={onHide}>
                <UpdateProfile
                    allUsers={allUsers[0]}
                    onHide={onHide}
                    getProfileById={getProfileById}
                />
            </Dialog>
            <div className="card">
                <h2 style={{ fontWeight: "700", letterSpacing: "-1px", color: 'black' }}>My Profile</h2>
            </div>

            <br />

            <div className="card" >
                <div className="flex flex-row justify-content-between">
                    <h4 style={{ color: "gray" }} className="p-4"> Personal information</h4>
                    <div className="p-4">
                        <Button
                            label="Edit"
                            className="View-Button"
                            icon="pi pi-pencil"
                            onClick={handleChange}
                        />
                    </div>
                </div>
                <div className="scroll-container flex justify-content-between pt-3 pb-5 pr-8 pl-8">
                    <div className="flex flex-row mb-4" style={{ alignItems: "center" }}>
                        <img src={`${baseURL}/${allUsers[0]?.image}`} width="140px" height="130px" style={{ border: "1px solid gray", borderRadius: "6px" }} />
                        <div className="flex flex-column">
                            <span style={{ color: 'gray', fontSize: "18px", fontWeight: "500" }} className="ml-6">Name:  <span className="ml-4">{allUsers[0]?.username} </span></span>
                            <span style={{ color: 'gray', fontSize: "18px", fontWeight: "500" }} className="ml-6 mt-2">Email:  <span className="ml-4">{allUsers[0]?.email}</span></span>
                            <span style={{ color: 'gray', fontSize: "18px", fontWeight: "500" }} className="ml-6 mt-2">Role:  <span className="ml-4">{allUsers[0]?.role?.role_Name}</span></span>
                        </div>
                    </div>

                </div>

                {/* <div className="col-12 flex flex-column pt-4 pr-8 pl-8" >
                    <div className="flex flex-row mb-2" style={{ color: "black", fontSize: "18px", fontWeight: "400" }}>
                        <p> Name: <span className="ml-6"> {allUsers[0]?.username} </span></p>
                    </div>
                    <div className="flex flex-row mb-2" style={{ color: "black", fontSize: "18px", fontWeight: "400" }}>
                        <p> Email: <span className="ml-6"> {allUsers[0]?.email} </span></p>
                    </div>
                    <div className="flex flex-row mb-2" style={{ color: "black", fontSize: "18px", fontWeight: "400" }}>
                        <p> Role: <span className="ml-6"> {allUsers[0]?.role?.role_Name} </span></p>
                    </div>
                </div> */}

            </div>

        </>
    );
};

export default MyProfile