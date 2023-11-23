import React, { useState } from 'react';
import './AdminHome.css';
import AdminHeader from './AdminHeader';
import axios from 'axios';
import { toast } from 'react-toastify';


function AddBank() {

    const initialBankData = {
        bankName:"",
        ifscCode:"",
        shortCode:"",
    };

    const [bankData, setBankData] = useState(initialBankData);

    const [errorMessage, setErrorMessage] = useState('');

    const {bankName, ifscCode, shortCode} = bankData;

    const onInputChange = (e) => {
        setBankData({...bankData,[e.target.name]: e.target.value});
    };

    const reset = () => {
        setBankData(initialBankData);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `http://localhost:5000/admin/addNewBank`;
        const token = localStorage.getItem('token');
        try {
          await axios({
            method: 'post',
            url: url,
            data: bankData,
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true, 
          })
          .then((res) => {
            if(res.data === 'success') {
              setBankData(initialBankData);
              setErrorMessage('');
              toast.success("New Bank Created Successfully");
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
                            <h4 className="pl-3 text-base text-slate-700">Add Bank</h4>
                        </div>
                        {errorMessage && <p style={{color:"red",fontWeight:'bold',fontSize:"13px",}}>{errorMessage}</p>}
                        <div className="pt-7 pl-7">
                            <div className='flex items-center mb-3'>
                                <label className='text-sm font-semibold w-1/4' htmlFor="bankName">
                                    Bank Name
                                </label>
                                <input type='text' required="required" id="bankName" className='h-7 w-72 border-2 border-slate-400 rounded' name='bankName' value={bankName} onChange={(e) => onInputChange(e)}/>
                            </div>
                            <div className='flex items-center mb-3'>
                            <label className='text-sm font-semibold w-1/4' htmlFor="ifscCode">
                                IFSC Code
                            </label>
                            <input type='text' required="required" id="ifscCode" className='h-7 w-72 border-2 border-slate-400 rounded' name='ifscCode' value={ifscCode} onChange={(e) => onInputChange(e)}/>
                            </div>
                            <div className='flex items-center mb-3'>
                            <label className='text-sm font-semibold w-1/4' htmlFor="shortCode">
                                Short Code
                            </label>
                            <input type='text' required="required" id="shortCode" className='h-7 w-72 border-2 border-slate-400 rounded' name='shortCode' value={shortCode} onChange={(e) => onInputChange(e)}/>
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

export default AddBank;
