import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import axios from 'axios';
import { useTable } from 'react-table';
import AdminHeader from './AdminHeader';

function TransactionDetails() {

  const initialData = {
    accountNo:"",
    transactionId:"",
  }
  const [errorMessage, setErrorMessage] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [data, setData] =useState(initialData);

  const onInputChange = (e) => {
    setData({...data,[e.target.name]: e.target.value});
  };

  const {accountNo, transactionId}=data;

  useEffect(() => {
    fetchTransactionDetails();
  }, []);

  const fetchTransactionDetails = async () => {
    const url = 'http://localhost:5000/admin/getAllTransactions';
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setTransactions(response.data);
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
    fetchUserTransactionDetails();
  }

  const fetchUserTransactionDetails = async () => {
    const url = `http://localhost:5000/admin/getUserTransactions?accountNo=${data.accountNo}&transactionId=${data.transactionId}`;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (Array.isArray(response.data)) {
        setTransactions(response.data);
      } else {
        setErrorMessage('No transactions found for this account number.');
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
      { Header: 'Transaction ID', accessor: 'transactionId' },
      { Header: 'Sender', accessor: 'sender.accountNo' },
      { Header: 'Recipient', accessor: 'recipient.accountNo' },
      { Header: 'Transaction Type', accessor: 'transactionType' },
      { Header: 'Amount', accessor: 'amount' },
      { Header: 'Transaction Date', accessor: 'transactionDate' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: transactions });

  return (
    <div>
      <AdminHeader/>
      <div>
      <h1 className='text-center font-bold text-lg'>Transaction Details</h1>
      <form onSubmit={(event)=>handleSubmit(event)}>
        <input type='number' className='h-10 pl-2 ml-36 mb-5 mt-5 w-72 border-2 border-slate-400 rounded' placeholder=' Account No' name='accountNo' value={accountNo} onChange={(e) => onInputChange(e)} />
        <span className='ml-10'>Or</span>
        <input type='number' className='h-10 pl-2 ml-10 mb-5 mt-5 w-72 border-2 border-slate-400 rounded' placeholder=' Transaction ID' name='transactionId' value={transactionId} onChange={(e) => onInputChange(e)} />
        <button className="ml-16 border-2 w-20 h-10 rounded-md bg-cyan-400 " type="submit">Submit</button>
      </form>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>} 
        {!errorMessage && transactions.length > 0 && (
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

export default TransactionDetails;
