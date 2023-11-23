import React, { useState } from 'react';
import './AdminHome.css';
import AdminHeader from './AdminHeader';
import axios from 'axios';
import { toast } from 'react-toastify';


function UpdatePassword() {

    const initialData = {
        password:"",
        newPassword:"",
        confirmNewPassword:"",
    };

    const [data, setData] = useState(initialData);

    const [errorMessage, setErrorMessage] = useState('');

    const [passwordError, setPasswordError] = useState('');

    const {password, newPassword, confirmNewPassword} = data;

    const onInputChange = (e) => {
        setData({...data,[e.target.name]: e.target.value});
    };

    const reset = () => {
        setData(initialData);
    }

    const handleBlur = () => {
        if (newPassword && confirmNewPassword && password !== confirmNewPassword) {
          setPasswordError('Passwords do not match!');
        } else {
          setPasswordError('');
        }
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `http://localhost:5000/admin/updatePassword`;
        const token = localStorage.getItem('token');
        try {
          await axios({
            method: 'post',
            url: url,
            data: data,
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true, 
          })
          .then((res) => {
            if(res.data === 'success') {
              setData(initialData);
              setErrorMessage('');
              toast.success("Password Updated Successfully");
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
                <div className="mt-36 ml-96">
                    <div className="border-2 rounded-md border-blue-200 w-1/2 h-full">
                        <div className="bg-blue-200 h-8">
                            <h4 className="pl-3 text-base text-slate-700">Password Update</h4>
                        </div>
                        {errorMessage && <p style={{color:"red",fontWeight:'bold',fontSize:"13px",}}>{errorMessage}</p>}
                        <div className="pt-7 pl-7">
                            <div className='flex items-center mb-3'>
                                <label className='text-sm font-semibold w-1/4' htmlFor="password">
                                    Password
                                </label>
                                <input type='password' required="required" id="password" className='h-7 w-72 border-2 border-slate-400 rounded' name='password' value={password} onChange={(e) => onInputChange(e)}/>
                            </div>
                            <div className='flex items-center mb-3'>
                            <label className='text-sm font-semibold w-1/4' htmlFor="newPassword">
                                NewPassword
                            </label>
                            <input type='password' required="required" id="newPassword" className='h-7 w-72 border-2 border-slate-400 rounded' name='newPassword' value={newPassword} onChange={(e) => onInputChange(e)}/>
                            </div>
                            {passwordError && <p className="error-message ml-28 text-red-500 text-sm">{passwordError}</p>}
                            <div className='flex items-center mb-3'>
                            <label className='text-sm font-semibold w-1/4' htmlFor="confirmNewPassword">
                                confirmNew
                                  Password
                            </label>
                            <input type='password' required="required" id="confirmNewPassword" className='h-7 w-72 border-2 border-slate-400 rounded' name='confirmNewPassword' value={confirmNewPassword} onChange={(e) => onInputChange(e)} onBlur={handleBlur}/>
                            </div>                   
                        </div>
                        <div className="pl-28 pt-2 mb-2 flex items-center">
                            <button className="pt-1 border-2 w-16 rounded-md bg-cyan-400 mr-3" type="submit">Save</button>
                            <label className='mr-3'>Or</label>
                            <button className="pt-1 border-2 w-16 rounded-md bg-cyan-400 " onClick={reset}>Clear</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
}

export default UpdatePassword;
