import React, { useState } from 'react';
import './UserHome.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserHeader from './UserHeader';


function FundTransfer() {

    const initialData = {
        recipientAccountNumber:"",
        amount:"",
        description:"",
    };

    const [fundTransferData, setFundTransferData] = useState(initialData);

    const [errorMessage, setErrorMessage] = useState('');

    const {recipientAccountNumber, amount, description} = fundTransferData;

    const onInputChange = (e) => {
      setFundTransferData({...fundTransferData, [e.target.name]: e.target.value});
    };

    const reset = () => {
        setFundTransferData(initialData);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `http://localhost:5000/user/fundTransfer`;
        const token = localStorage.getItem('token');
        try {
          await axios({
            method: 'post',
            url: url,
            data: fundTransferData,
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
           
          })
          .then((res) => {
            if(res.data === 'success') {
              setFundTransferData(initialData);
              setErrorMessage('');
              toast.success("Amount Debited Successfully");
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
        <UserHeader />
        <div>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="mt-36 ml-96">
                    <div className="border-2 rounded-md border-blue-200 w-1/2 h-full">
                        <div className="bg-blue-200 h-8">
                            <h4 className="pl-3 text-base text-slate-700">Fund Transfer</h4>
                        </div>
                        {errorMessage && <p style={{color:"red",fontWeight:'bold',fontSize:"13px",}}>{errorMessage}</p>}
                        <div className="pt-7 pl-7">
                            <div className='flex items-center mb-3'>
                                <label className='text-sm font-semibold w-1/4' htmlFor="recipientAccountNumber">
                                  Recipient Account Number
                                </label>
                                <input type='number' required="required" id="recipientAccountNumber" className='h-7 w-72 border-2 border-slate-400 rounded' name='recipientAccountNumber' value={recipientAccountNumber} onChange={(e) => onInputChange(e)}/>
                            </div>
                            <div className='flex items-center mb-3'>
                            <label className='text-sm font-semibold w-1/4' htmlFor="amount">
                                Amount
                            </label>
                            <input type='number' required="required" id="amount" className='h-7 w-72 border-2 border-slate-400 rounded' name='amount' value={amount} onChange={(e) => onInputChange(e)}/>
                            </div>
                            <div className='flex items-center mb-3'>
                            <label className='text-sm font-semibold w-1/4' htmlFor="description">
                                Description
                            </label>
                            <input type='text' required="required" id="description" className='h-7 w-72 border-2 border-slate-400 rounded' name='description' value={description} onChange={(e) => onInputChange(e)}/>
                            </div>                   
                        </div>
                        <div className="pl-28 pt-2 mb-2 flex items-center">
                            <button className="pt-1 border-2 w-16 rounded-md bg-cyan-400 mr-3" type="submit">Send</button>
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

export default FundTransfer;
