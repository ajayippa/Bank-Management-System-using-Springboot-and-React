import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import AdminHeader from './AdminHeader';
import axios from 'axios';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';


function UserDetails() {

  const initialData = {
    accountNo:"",
    userName:"",
  }
  const [errorMessage, setErrorMessage] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [data, setData] =useState(initialData);

  const onInputChange = (e) => {
    setData({...data,[e.target.name]: e.target.value});
  };

  const handleEditClick = (row) => {
    console.log('Row Data:', row);
    localStorage.setItem('rowData', JSON.stringify(row));
  };

  const {accountNo, userName}=data;

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const url = 'http://localhost:5000/admin/getAllUserDetails';
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUserDetails(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errorMessage) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    fetchParticularUserDetails();
  }

  const fetchParticularUserDetails = async () => {
    const url = `http://localhost:5000/admin/getParticularUserDetails?accountNo=${data.accountNo}&userName=${data.userName}`;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (Array.isArray(response.data)) {
        setUserDetails(response.data);
      } else {
        setErrorMessage('No User Details found for this account number.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errorMessage) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Account Number', accessor: 'accountNo' },
      { Header: 'Account name', accessor: 'accountName' },
      { Header: 'Amount', accessor: 'amount' },
      { Header: 'Bank Name', accessor: 'bank.bankName' },
      { Header: 'Mobile', accessor: 'mobile' },
      { Header: 'DOB', accessor: 'dateOfBirth' },
      {
        Header: 'Edit',
        Cell: ({ row }) => (  // Use the 'Cell' property to render the Edit button
          <Link to={`/editCustomerDetails/${row.original.accountNo}`}>
            <button className="pt-1 border-2 w-16 rounded-md bg-green-400 " onClick={() => handleEditClick(row.original)}>Edit</button>
          </Link>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: userDetails });

  return (
    <div>
        <AdminHeader />
        <div>
      <h1 className='text-center font-bold text-lg'>User Details</h1>
      <form onSubmit={(event)=>handleSubmit(event)}>
        <input type='number' className='h-10 pl-2 ml-36 mb-5 mt-5 w-72 border-2 border-slate-400 rounded' placeholder=' Account No' name='accountNo' value={accountNo} onChange={(e) => onInputChange(e)} />
        <span className='ml-10'>Or</span>
        <input type='text' className='h-10 pl-2 ml-10 mb-5 mt-5 w-72 border-2 border-slate-400 rounded' placeholder=' User Name' name='userName' value={userName} onChange={(e) => onInputChange(e)} />
        <button className="ml-16 border-2 w-20 h-10 rounded-md bg-cyan-400 " type="submit">Submit</button>
      </form>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>} 
        {!errorMessage && userDetails.length > 0 && (
            <div>
                <div className="table-container">
                    <table {...getTableProps()} className="table">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                            </tr>
                        );
                        })}
                    </tbody>
                    </table>
                </div>
            </div>
        )}
    </div>
  );
}

export default UserDetails;
