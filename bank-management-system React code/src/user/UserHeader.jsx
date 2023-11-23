import React, { useEffect, useState } from 'react';
import './UserHome.css';
import {  Link, useNavigate } from "react-router-dom";


function UserHeader() {

    let navigate = useNavigate();

    const [customerName, setCustomerName] = useState('');
    const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);


    useEffect(() => {
        const storedAdminName = localStorage.getItem('name');
        if (storedAdminName) {
            setCustomerName(storedAdminName);
        }
    }, []);

    const handleLogoutClick = () => {
        setShowLogoutDropdown(!showLogoutDropdown);
        
    };
    
    function homePage() {
        navigate('/userHome');
    }

    function accountBalance() {
        navigate('/accountBalance');
    }

    function fundTransfer() {
        navigate('/fundTransfer');
    }

    function miniStatement() {
        navigate('/miniStatement');
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
            <div className="space-x-6 text-gray-500 flex">
                <div className='space-x-6'>
                <span className="cursor-pointer hover:text-slate-300" onClick={homePage}>Home</span>
                <span className="cursor-pointer hover:text-slate-300" onClick={accountBalance}>Account Balance</span>
                <span className="cursor-pointer hover:text-slate-300" onClick={fundTransfer}>Fund Transfer</span>
                <span className="cursor-pointer hover:text-slate-300" onClick={miniStatement}>Fund Transfer Report</span>
                </div>
                <div className='userReport'>
                    <span className=' cursor-pointer hover:text-slate-300' onClick={handleLogoutClick}>Hi, {customerName || 'User'}</span>
                    {showLogoutDropdown && (
                    <div  className="absolute top-9 mt-5 w-48 bg-white border border-gray-300 rounded shadow-md logoutDropDown">
                    <ul>
                        <li className="cursor-pointer p-2 hover:bg-slate-100"  >
                            <Link to={"/updateUserPassword"}>Updtae Password</Link>
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
    </div>
  );
}

export default UserHeader;
