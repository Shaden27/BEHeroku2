
import './App.css';
import DoctorLogin from './Components/DoctorLogin';
import {Routes,Route} from 'react-router-dom'
import AdminLogin from './Components/AdminLogin';
import DoctorSidebar from './Components/DoctorSidebar';
import DoctorAccount from './Pages/DoctorAccount';
import ForgotPassword from './Components/ForgotPassword';
import DoctorDashboard from './Components/DoctorDashboard';
import ResetPassword from './Components/ResetPassword';
import AdminDashboard from './Components/AdminDashboard';
import PasswordResetSuccess from './Components/PasswordResetSuccess';
import Otp from './Components/Otp';
import Patients from './Components/Patients';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DoctorLogin></DoctorLogin>}></Route>
        <Route path="/adminLogin" element={<AdminLogin></AdminLogin>}></Route>
        <Route path="/doctorsidebar" element={<DoctorSidebar></DoctorSidebar>}></Route>
        <Route path='/doctorAccount' element={<DoctorAccount></DoctorAccount>}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/doctordashboard' element={<DoctorDashboard></DoctorDashboard>}></Route>
        <Route path='/resetPassword' element={<ResetPassword></ResetPassword>}></Route>
        <Route path='/admindashboard' element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path='/passwordresetsuccess' element={<PasswordResetSuccess></PasswordResetSuccess>}></Route>
        <Route path='/otp' element={<Otp></Otp>}></Route>
        <Route path='/patients' element={<Patients></Patients>}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
