import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import axios from 'axios';
import { useTable } from 'react-table';
import AdminHeader from './AdminHeader';
import { Link } from 'react-router-dom';

function BankDetails() {
  const [errorMessage, setErrorMessage] = useState('');
  const [bankDetails, setBankDetails] = useState([]);

  const handleEditClick = (row) => {
    console.log('Row Data:', row);
    localStorage.setItem('rowData', JSON.stringify(row));
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    const url = 'http://localhost:5000/admin/getAllBankDetails';
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setBankDetails(response.data);
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
      { Header: 'Bank ID', accessor: 'bankId' },
      { Header: 'Bank Name', accessor: 'bankName' },
      { Header: 'IFSC Code', accessor: 'ifscCode' },
      { Header: 'Short Code', accessor: 'shortCode' },
      {
        Header: 'Edit',
        Cell: ({ row }) => (  // Use the 'Cell' property to render the Edit button
          <Link to={`/editbankDetails/${row.original.bankId}`}>
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
  } = useTable({ columns, data: bankDetails });

  return (
    <div>
      <AdminHeader/>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {!errorMessage && bankDetails.length > 0 && (
        <div>
            <h1 className='text-center font-bold text-lg'>Bank Details</h1>
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

export default BankDetails;
