import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import AdminHeader from './AdminHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditBankDetails() {

    const [rowData, setRowData] = useState(null);

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const [bankData, setBankData] = useState({
        bankName: '',
        ifscCode: '',
        shortCode: ''
    });

    useEffect(() => {
        const data = localStorage.getItem('rowData');
        if (data) {
            const parsedData = JSON.parse(data);
            setRowData(parsedData);
            setBankData(parsedData);  // Initialize bankData with the row data
            localStorage.removeItem('rowData');
        }
    }, []);

    if (!rowData) {
        return <div>Error: Data not found</div>;
    }

    const {bankName, ifscCode, shortCode} = bankData;

    const onInputChange = (e) => {
        setBankData({...bankData,[e.target.name]: e.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `http://localhost:5000/admin/updateBankDetails/${rowData.bankId}`;
        const token = localStorage.getItem('token');
        try {
          await axios({
            method: 'put',
            url: url,
            data: bankData,
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true, 
          })
          .then((res) => {
            if(res.data === 'success') {
              navigate("/bankDetails");
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
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
}

export default EditBankDetails;
