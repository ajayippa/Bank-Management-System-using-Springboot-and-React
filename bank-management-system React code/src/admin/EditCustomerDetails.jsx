import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import AdminHeader from './AdminHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function EditCustomerDetails() {

    const [rowData, setRowData] = useState(null);

    const navigate = useNavigate();

    const initialUserData = {
        accountType:"",
        accountName:"",
        firstName:"",
        lastName:"",
        loginId:"",
        email:"",
        dateOfBirth:"",
        mobile:"",
        gender:"",
        nationality:"",
    };
    
    const [userData, setUserData] = useState(initialUserData);
    
    const [errorMessage, setErrorMessage] = useState('');

    const {accountType,accountName,firstName,lastName,loginId,email,dateOfBirth,mobile,gender,nationality} = userData;
    const onInputChange = (e) =>{
        setUserData({...userData,[e.target.name]: e.target.value } );
    };

    useEffect(() => {
        const data = localStorage.getItem('rowData');
        if (data) {
            const parsedData = JSON.parse(data);
            setRowData(parsedData);
            setUserData(parsedData);  // Initialize bankData with the row data
            localStorage.removeItem('rowData');
        }
    }, []);

    if (!rowData) {
        return <div>Error: Data not found</div>;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `http://localhost:5000/admin/updateCustomerDetails/${rowData.accountNo}`;
        const token = localStorage.getItem('token');
        try {
          await axios({
            method: 'put',
            url: url,
            data: userData,
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true, 
          })
          .then((res) => {
            if(res.data === 'success') {
              navigate("/userDetails");
            }
            else {
              setErrorMessage(res.data);
            }
          });
        } catch (error){
          if (error.response && error.response.data && error.response.data.errorMessage) {
            setErrorMessage(error.response.data.errorMessage);
          } else {
            setErrorMessage(['An error occurred. Please try again.']);
          }
        }
    }
  return (
    <div>
        <AdminHeader />
        <div>
            <form onSubmit={(event)=>handleSubmit(event)}>
            <div className="mt-10 ml-96">
                <div className="border-2 rounded-md border-blue-200 w-1/2 h-full">
                <div className="bg-blue-200">
                    <h4 className="pl-3 text-lg">User Registration</h4>
                </div>
                {errorMessage && <p style={{color:"red",fontWeight:'bold',fontSize:"13px",}}>{errorMessage}</p>}
                <div className='pl-3 pt-2'>
                    <label className='text-gray-500 text-base'>Bank Detail</label>
                </div>
                <hr />
                <div className="pt-3 pl-7">
                    <div className="flex items-center mb-3">
                    <label className='text-sm font-semibold w-1/4' htmlFor="accounttypedropdown">
                        Type Of Account
                    </label>
                    <select id="accounttypedropdown" name="accountType" value={accountType} className="h-7 w-72 border-2 border-slate-400 rounded" onChange={(e) => onInputChange(e)}>
                        <option value="">select</option>
                        <option value="Saving">Saving</option>
                        <option value="Current">Current</option>
                        <option value="Fixed Deposit">Fixed Deposit</option>
                    </select>
                    </div>
                    <div className='flex items-center mb-3'>
                    <label className='text-sm font-semibold w-1/4' htmlFor="accountname">
                        Account Name
                    </label>
                    <input type='text' required="required" id="accountname" className='h-7 w-72 border-2 border-slate-400 rounded' name="accountName" value={accountName} onChange={(e) => onInputChange(e)}/>
                    </div>
                </div>
                <div className='pl-3 pt-2'>
                    <label className='text-gray-500 text-base'>User Detail</label>
                </div>
                <hr />
                <div className="pt-3 pl-7">
                    <div className='flex items-center mb-3'>
                    <label className='text-sm font-semibold w-1/4' htmlFor="firstname">
                        First Name
                    </label>
                    <input type='text' required="required" id="firstname" className='h-7 w-72 border-2 border-slate-400 rounded' name="firstName" value={firstName} onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className='flex items-center mb-3'>
                    <label className='text-sm font-semibold w-1/4' htmlFor="lastname">
                        Last Name
                    </label>
                    <input type='text' required="required" id="lastname" className='h-7 w-72 border-2 border-slate-400 rounded' name="lastName" value={lastName} onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className='flex items-center mb-3'>
                    <label className='text-sm font-semibold w-1/4' htmlFor="loginid">
                        Login Id
                    </label>
                    <input type='text' required="required" id="loginid" className='h-7 w-72 border-2 border-slate-400 rounded' name="loginId" value={loginId} onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className='flex items-center mb-3'>
                    <label className='text-sm font-semibold w-1/4' htmlFor="email">
                        Email
                    </label>
                    <input type='email' required="required" id="email" className='h-7 w-72 border-2 border-slate-400 rounded' name="email" value={email} onChange={(e) => onInputChange(e)}/>
                    </div>
                </div>
                <div className='pl-3 pt-2'>
                    <label className='text-gray-500 text-base'>Personal Detail</label>
                </div>
                <hr />
                <div className="pt-3 pl-7">
                    <div className='flex items-center mb-3'>
                    <label className='text-sm font-semibold w-1/4' htmlFor="dateofbirth">
                        Date of Birth
                    </label>
                    <input type='date' required="required" id="dateofbirth" className='h-7 w-72 border-2 border-slate-400 rounded' name="dateOfBirth" value={dateOfBirth} onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className='flex items-center mb-3'>
                    <label className='text-sm font-semibold w-1/4' htmlFor="mobileno">
                        Mobile No.
                    </label>
                    <input type='number' required="required" id="mobileno" minLength={"10"} maxLength={"10"} className='h-7 w-72 border-2 border-slate-400 rounded' name="mobile" value={mobile} onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className="flex items-center mb-3">
                    <label className='text-sm font-semibold w-1/4' htmlFor="genderdropdown">
                        Gender
                    </label>
                    <select id="genderdropdown" name="gender" value={gender} className="h-7 w-72 border-2 border-slate-400 rounded" onChange={(e) => onInputChange(e)}>
                        <option value="">select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>
                    <div className='flex items-center mb-3'>
                    <label className='text-sm font-semibold w-1/4' htmlFor="nationality">
                        Nationality
                    </label>
                    <input type='text' required="required" id="nationality" className='h-7 w-72 border-2 border-slate-400 rounded' name="nationality" value={nationality} onChange={(e) => onInputChange(e)}/>
                    </div>
                </div>
                <div className="pl-28 pt-2 mb-2 flex items-center">
                    <button className="pt-1 border-2 w-16 rounded-md bg-cyan-400 mr-3" type="submit">Save</button>
                </div>
                </div>
            </div>
            </form>
        </div>
    </div>
  );
}

export default EditCustomerDetails;
