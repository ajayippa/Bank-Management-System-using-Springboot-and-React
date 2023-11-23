import React from 'react';
import './AdminHome.css';
import AdminHeader from './AdminHeader';


function AdminHome() {

  return (
    <div>
        <AdminHeader />
        <div className='flex items-center justify-center'>
            <img className='object-cover' src="images/bank2.jpg" alt=''></img>
        </div>
    </div>
  );
}

export default AdminHome;
