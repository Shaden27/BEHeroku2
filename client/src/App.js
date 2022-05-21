
import './App.css';
import DoctorLogin from './Components/DoctorLogin';
import {Routes,Route} from 'react-router-dom'
import AdminLogin from './Components/AdminLogin';
import DoctorSidebar from './Components/DoctorSidebar';
import DoctorAccount from './Pages/DoctorAccount';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import PasswordResetSuccess from './Components/PasswordResetSuccess';
import Otp from './Components/Otp';
import Patients from './Components/Patients';
import Actualpatient from './Components/Actualpatient';
import AdminAccount from './Pages/AdminAccount'
import DoctorNavbar from './Components/DoctorNavbar';
import AdminNavbar from './Components/AdminNavbar';
import AdminControl from './Components/AdminControl';
import AddPatient from './Components/AddPatient';
import DoctorControl from './Components/DoctorControl';
import UploadScan from './Components/UploadScan';
import ShowScans from './Components/ShowScans';
import AddPatientSuccess from './Components/AddPatientSuccess';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DoctorLogin></DoctorLogin>}></Route>
        <Route path="/adminLogin" element={<AdminLogin></AdminLogin>}></Route>
        <Route path="/doctorsidebar" element={<DoctorSidebar></DoctorSidebar>}></Route>
        <Route path='/doctorAccount' element={<DoctorAccount></DoctorAccount>}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/doctornavbar' element={<DoctorNavbar></DoctorNavbar>}></Route>
        <Route path='/resetPassword' element={<ResetPassword></ResetPassword>}></Route>
        <Route path='/adminnavbar' element={<AdminNavbar></AdminNavbar>}></Route>
        <Route path='/passwordresetsuccess' element={<PasswordResetSuccess></PasswordResetSuccess>}></Route>
        <Route path='/otp' element={<Otp></Otp>}></Route>
        <Route path='/patients' element={<Patients></Patients>}></Route>
        <Route path='/actualpatient' element={<Actualpatient></Actualpatient>}></Route>
        <Route path='/adminAccount' element={<AdminAccount></AdminAccount>}></Route>
        <Route path='/admincontrol' element={<AdminControl></AdminControl>}></Route>
        <Route path='/addpatient' element={<AddPatient></AddPatient>}></Route>
        <Route path='doctorcontrol' element={<DoctorControl></DoctorControl>}></Route>
        <Route path='/uploadscan' element={<UploadScan></UploadScan>}></Route>
        <Route path='showscans' element={<ShowScans></ShowScans>}></Route>
        <Route path='addPatientSuccess' element={<AddPatientSuccess></AddPatientSuccess>}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
