import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './homePage/SignIn';
import UserHome from './user/UserHome';
import AdminHome from './admin/AdminHome';
import AddUser from './admin/AddUser';
import AddBank from './admin/AddBank';
import AccountBalance from './user/AccountBalance';
import FundTransfer from './user/FundTransfer';
import MiniStatement from './user/MiniStatement';
import TransactionDetails from './admin/TransactionDetails';
import BankDetails from './admin/BankDetails';
import UserDetails from './admin/UserDetails';
import EditBankDetails from './admin/EditBankDetails';
import EditCustomerDetails from './admin/EditCustomerDetails';
import UpdatePassword from './admin/UpdatePassword';
import UpdateUserPassword from './user/UpdateUserPassword';

function App() {
  return (
    <>
    <Router>
    <ToastContainer />
      <Routes>
        <Route exact path="/" element={<SignIn/>}/>
        <Route path="/userHome" element={<UserHome/>}/>
        <Route path="/adminHome" element={<AdminHome/>}/>
        <Route path="/addUser" element={<AddUser/>}/>
        <Route path="/addbank" element={<AddBank/>}/>
        <Route path="/accountBalance" element={<AccountBalance/>}/>
        <Route path="/fundTransfer" element={<FundTransfer/>}/>
        <Route path="/miniStatement" element={<MiniStatement/>}/>
        <Route path="/transactionDetails" element={<TransactionDetails/>}/>
        <Route path="/bankDetails" element={<BankDetails/>}/>
        <Route path="/userDetails" element={<UserDetails/>}/>
        <Route path="/editbankDetails/:bankId" element={<EditBankDetails/>}/>
        <Route path="/editCustomerDetails/:accountNo" element={<EditCustomerDetails/>}/>
        <Route path="/updatePassword" element={<UpdatePassword/>}/>
        <Route path="/updateUserPassword" element={<UpdateUserPassword/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
