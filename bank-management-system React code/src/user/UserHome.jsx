import React from 'react';
import './UserHome.css';
import UserHeader from './UserHeader';


function UserHome() {

  return (
    <div>
        <UserHeader />
        <div className='flex items-center justify-center'>
            <img className='object-cover' src="images/bank2.jpg" alt=''></img>
        </div>
    </div>
  );
}

export default UserHome;
