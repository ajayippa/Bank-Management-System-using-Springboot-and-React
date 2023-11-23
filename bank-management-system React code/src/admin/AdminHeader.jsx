import React, {  useEffect, useState } from 'react';
import './AdminHome.css';
import { Link, useNavigate } from "react-router-dom";


function AdminHeader() {

    let navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);
    const [showAdministrationDropdown, setShowAdministrationDropDown] = useState(false);
    const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
    
    const [adminName, setAdminName] = useState('');

    useEffect(() => {
        const storedAdminName = localStorage.getItem('name');
        if (storedAdminName) {
            setAdminName(storedAdminName);
        }
    }, []);

    const handleReportClick = () => {
        setShowDropdown(!showDropdown);
        if (showAdministrationDropdown) {
            setShowAdministrationDropDown(false);
        }
        if(showLogoutDropdown) {
            setShowLogoutDropdown(false);
        }
    };

    const handleAdminstrationClick = () => {
        setShowAdministrationDropDown(!showAdministrationDropdown);
        if (showDropdown) {
            setShowDropdown(false);
        }
        if(showLogoutDropdown) {
            setShowLogoutDropdown(false);
        }
    };
    const handleLogoutClick = () => {
        setShowLogoutDropdown(!showLogoutDropdown);
        if (showDropdown) {
            setShowDropdown(false);
        }
        if (showAdministrationDropdown) {
            setShowAdministrationDropDown(false);
        }
    };

    function homePage() {
        navigate('/adminHome');
    }

    function handleLogOut()  {
        localStorage.clear(); // Clears all data in localStorage
        navigate('/'); // Navigate to the desired logout or home page
    };

  return (
    <div>
        <div className="flex h-16 items-center pl-5 bg-gray-900 space-x-5">
            <div>
                <h1 className="text-xl text-white">Online Bank Management</h1>
            </div>
            <div className="space-x-6 text-gray-500">
                <span className="cursor-pointer hover:text-slate-300" onClick={homePage}>Home</span>
                <span className={`cursor-pointer hover:text-slate-300" ${showAdministrationDropdown ? 'text-slate-300':''}`} onClick={handleAdminstrationClick}>Adminstration</span>
                {showAdministrationDropdown && ( 
                    <div  className="absolute top-9 mt-5 w-48 bg-white border border-gray-300 rounded shadow-md adminstrationDropDown">
                        <ul>
                            <li className="cursor-pointer p-2 hover:bg-slate-100"  >
                                <Link to={"/addUser"}>Add User</Link>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-slate-100">
                                <Link to={"/addBank"}>Add Bank</Link>
                            </li>
                        </ul>
                    </div>
                )}
                <span className={`cursor-pointer hover:text-slate-300 ${showDropdown ? 'text-slate-300':''}`} onClick={handleReportClick}>Report</span>
                {showDropdown && ( 
                    <div  className="absolute top-9 mt-5 w-48 bg-white border border-gray-300 rounded shadow-md reportDropDown">
                        <ul>
                            <li className="cursor-pointer p-2 hover:bg-slate-100"  >
                                <Link to={"/transactionDetails"}>Fund Transfer Report</Link>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-slate-100">
                                <Link to={"/bankDetails"}>Bank Transaction Report</Link>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-slate-100">
                                <Link to={"/userDetails"}>User Report</Link>
                            </li>
                        </ul>
                    </div>
                )}
                <span className='cornerRight cursor-pointer hover:text-slate-300' onClick={handleLogoutClick}>Hi, {adminName || 'Admin'}</span>
                {showLogoutDropdown && (
                    <div  className="absolute top-9 mt-5 w-48 bg-white border border-gray-300 rounded shadow-md logoutDropDown">
                    <ul>
                        <li className="cursor-pointer p-2 hover:bg-slate-100"  >
                            <Link to={"/updatePassword"}>Updtae Password</Link>
                        </li>
                        <li className="cursor-pointer p-2 hover:bg-slate-100">
                            <Link to={'/'} onClick={handleLogOut}>LogOut</Link>
                        </li>
                    </ul>
                </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default AdminHeader;
