import React, { useEffect, useState } from 'react';
import './UserHome.css';
import UserHeader from './UserHeader';
import axios from 'axios';


function AccountBalance() {
    const [accountBalance, setAccountBalance] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAccountBalance();
    }, []);

    const fetchAccountBalance = async () => {
        const url = `http://localhost:5000/user/accountBalance`;
        const token = localStorage.getItem('token');
        try {
          await axios({
            method: 'get',
            url: url,
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
           
          })
          .then((res) => {
            if(res.data ) {
              setAccountBalance(res.data);
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
    };

  return (
    <div>
        <UserHeader />
        <div>
            <div className="mt-36 ml-96">
                <div className="border-2 rounded-md border-blue-200 w-1/2 h-full">
                    <div className="bg-blue-200 h-8">
                        <h4 className="pl-3 text-base text-slate-700">Account Balance</h4>
                    </div>
                    {errorMessage && <p style={{color:"red",fontWeight:'bold',fontSize:"13px",}}>{errorMessage}</p>}
                    <div className="pt-7 pl-7">
                        <div className='mb-3'>
                            <label className='text-sm font-semibold w-1/4'>
                                Your Account Balance is : {accountBalance}
                            </label>
                        </div>                   
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AccountBalance;
