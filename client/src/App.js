
import './App.css';
import DoctorLogin from './Components/DoctorLogin';
import {Routes,Route} from 'react-router-dom'
import AdminLogin from './Components/AdminLogin';
import DoctorSidebar from './Components/DoctorSidebar';
import Account from './Pages/Account';
import ForgotPassword from './Components/ForgotPassword';
import DoctorDashboard from './Components/DoctorDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DoctorLogin></DoctorLogin>}></Route>
        <Route path="/adminLogin" element={<AdminLogin></AdminLogin>}></Route>
        <Route path="/doctorsidebar" element={<DoctorSidebar></DoctorSidebar>}></Route>
        <Route path='/account' element={<Account></Account>}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/doctordashboard' element={<DoctorDashboard></DoctorDashboard>}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
