import React, { useState } from "react";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { useDispatch } from "react-redux";
import { confirmDialog } from "primereact/confirmdialog";
import img from "../../assets/jswall_assets/JS WALL/OHS.png"
import { useHistory } from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';

const Notifications = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [isActive, setIsActive] = useState(false)
    const [userdataId, setUserDataId] = useState();
    const [addEditUser, setAddEditUser] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [displayDialog2, setDisplayDialog2] = useState(false);
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

        setIsActive(false);
    }

    const handleViewInfo = (id) => {
        console.log("id view", id)
        history.push("./companiesInfo")
    };

    const myData = [

        { logo: img, name: "Partner have requested for new password", Action: 'button', id: 1 },
        { logo: img, name: "Partner have requested for new password", Action: 'button', id: 2 },
        { logo: img, name: "Partner have requested for new password", Action: 'button', id: 3 },
        { logo: img, name: "Partner have requested for new password", Action: 'button', id: 4 },
        { logo: img, name: "Partner have requested for new password", Action: 'button', id: 5 },
    ]

    return (
        <>


            <div className="card">
                <h2 style={{ fontWeight: "700", letterSpacing: "-1px", color: 'black' }}>Notifications</h2>
            </div>

            <br />

            <div className="card" >
                <TabView >
                    <TabPanel header="All">
                        {myData?.map((item) => {
                            return (
                                <div key={item.id}>
                                    <div className="scroll-container card flex justify-content-between">
                                        <div className="flex flex-row mb-2" style={{ alignItems: "center" }}>
                                            <img src={item.logo} width="60px" height="60px" style={{ border: "1px solid gray", borderRadius: "50%" }} />
                                            <p style={{ color: 'black' }} className="ml-6">{item?.name}</p>
                                        </div>
                                        <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                                            <div className="">
                                                <Button
                                                    type="button"
                                                    label="View Settings"
                                                    className="Save-Button"
                                                    onClick={() => {
                                                        handleViewInfo(item.id);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </TabPanel>
                    <TabPanel header="New" className="ml-8">
                    </TabPanel>
                    <TabPanel header="Unread" className="ml-8">
                    </TabPanel>
                </TabView>
            </div>

        </>
    );
};

export default Notifications