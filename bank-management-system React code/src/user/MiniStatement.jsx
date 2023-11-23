import React, { useEffect, useState } from 'react';
import './UserHome.css';
import UserHeader from './UserHeader';
import axios from 'axios';
import { useTable } from 'react-table';

function MiniStatement() {
  const [errorMessage, setErrorMessage] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchMiniStatement();
  }, []);

  const fetchMiniStatement = async () => {
    const url = 'http://localhost:5000/user/getMiniStatement';
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
      <UserHeader />
      {errorMessage && <div className="error">{errorMessage}</div>}
        {!errorMessage && transactions.length > 0 && (
          <div>
            <h1 className='text-center font-bold text-lg'>Transaction Details</h1>
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

export default MiniStatement;
