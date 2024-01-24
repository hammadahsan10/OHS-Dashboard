import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { BrowserRouter, Routes, Route, useLocation, Switch, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import { AppConfig } from "./AppConfig";
import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import "./App.scss";
import Login from "./pages/login/Login";
import ManageCompanies from "./pages/Company/ManageCompanies";
import CompanyInfo from "./pages/Company/CompanyInfo";
import AddEditCompanies from "./pages/Company/AddEditCompanies";
import SignUp from "./pages/login/SignUp";
import ForgotPassword from "./pages/login/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";
import Notifications from "./pages/Notification/Notifications";
import { confirmDialog } from "primereact/confirmdialog";
import MyProfile from "./pages/MyProfile/MyProfile";
import Home from "./pages/Home/Home";
import OTP from "./pages/login/OTP";
import Survey from "./pages/Survey/Survey";
import StartYearFields from "./pages/Survey/StartYearFields";
import MidYearFields from "./pages/Survey/MidYearFields";
import EndYearFields from "./pages/Survey/EndYearFields";
import StartYearForms from "./pages/Survey/Start-Year/StartYearForms";
import MidYearForms from "./pages/Survey/Mid-Year/MidYearForms";

const App = () => {

    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();
    const history = useHistory()
    const role_Name = localStorage.getItem('role_Name')

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode);
    };

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode);
    };

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {

        menuClick = true;
        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }
        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;
        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;
        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    // const superAdminMenu = [
    //     {
    //         items: [
    //             ...(role === "Super Admin" || role === "super admin" || role === "Super admin" || role === "super Admin"
    //                 ? [{ label: "Manage Users", icon: "custom-users-icon", to: "/users" }]
    //                 : []
    //             ),
    //             {
    //                 label: "Manage Contacts",
    //                 icon: "custom-roles-icon",
    //                 to: "/contact",
    //                 items: [
    //                     { label: "Compare Contacts", icon: "pi pi-user", to: "/compare-contacts" },
    //                 ],
    //             },
    //             { label: "Manage Departments", icon: "pi pi-book", to: "/department" },
    //             ...(role === "Super Admin" || role === "super admin" || role === "Super admin" || role === "super Admin"
    //                 ? [{ label: "Manage Roles", icon: "pi pi-users", to: "/roles" }]
    //                 : []
    //             ),
    //         ],
    //     },
    // ];

    const handleLogOut = () => {
        confirmDialog({
            message: 'Are you sure you want to Logout ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => acceptLogOut(),
            reject: null
        });
    }

    const acceptLogOut = () => {
        window.localStorage.clear();
        localStorage.clear()
        localStorage.removeItem("login")
        history.push("./")
    }

    const superAdminMenu = [
        {
            items: [

                { label: "Home", icon: "pi pi-home", to: "/home" },
                { label: "Surverys", icon: "pi pi-users", to: "/surverys" },
                ...(role_Name === "Admin"
                    ? [{ label: "Companies", icon: "pi pi-book", to: "/company" },]
                    : []
                ),
                { label: "My Profile", icon: "pi pi-book", to: "/myprofile" },
                ...(role_Name === "Admin"
                    ? [{ label: "Notifications", icon: "pi pi-book", to: "/Notifications" },]
                    : []
                ),
                { label: "Logout", icon: "pi pi-book", command: handleLogOut },
            ],
        },
    ];


    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": ripple === false,
        "layout-theme-light": layoutColorMode === "light",
    });

    LoadingOverlay.propTypes = undefined;

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            {/* <LoadingOverlay active={isLoading} spinner text="Loading ..."> */}
            <ToastContainer />
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            {(localStorage.getItem("login") === null || localStorage.getItem("login") === undefined || !localStorage.getItem("login") === undefined) ?
                (
                    <>

                        <Route exact path="/" component={Login} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/forgotpassword" component={ForgotPassword} />
                        <Route path="/resetpassword" component={ResetPassword} />
                        <Route path="/otp" component={OTP} />
                    </>
                ) : (
                    <>
                        <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
                        <div className="layout-sidebar" onClick={onSidebarClick}>
                            <AppMenu model={superAdminMenu}
                                onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                        </div>
                        <div className="layout-main-container innr-Body">
                            <div className="layout-main">

                                <Switch>
                                    <Route path="/company" component={ManageCompanies} />
                                    <Route path="/companyinfo" component={CompanyInfo} />
                                    <Route path="/addeditcompanies" component={AddEditCompanies} />
                                    <Route path="/notifications" component={Notifications} />
                                    <Route path="/myprofile" component={MyProfile} />
                                    <Route path="/home" component={Home} />
                                    <Route path="/surverys" component={Survey} />
                                    <Route path="/startyearfields" component={StartYearFields} />
                                    <Route path="/midyearfields" component={MidYearFields} />
                                    <Route path="/startyearforms" component={StartYearForms} />
                                    <Route path="/midyearforms" component={MidYearForms} />
                                    <Route path="/endyearfields" component={EndYearFields} />
                                </Switch>

                            </div>
                            {/* <AppFooter layoutColorMode={layoutColorMode} /> */}
                        </div>
                    </>
                )
            }

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
            {/* </LoadingOverlay> */}
        </div>
    );
};


export default App;
