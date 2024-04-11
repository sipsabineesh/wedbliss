import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/user/Home'
import Signup from './pages/SignUp'
import OtpVerify from './pages/OtpVerification'
import Login from './pages/Login'
import Profile from './pages/user/Profile'
import AdminDashboard from './pages/admin/AdminDashboard'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import AdminUserList from './pages/admin/AdminUserList'
import EditProfile from './pages/user/EditProfile'
import AdminLogin from './pages/admin/AdminLogin';
import Suggestions from './pages/user/Suggestions';
import Interests from './pages/user/Interests';
import AcceptedList from './pages/user/AcceptedList';
import AdminPlans from './pages/admin/AdminPlans';


export default function App() {
  return <Router>
    {/* <Header/> */}
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="otpVerify" element={<OtpVerify/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/adminLogin" element={<AdminLogin/>}/>

        
        <Route element={<AdminPrivateRoute/>}>
         <Route path="/dashboard" element={<AdminDashboard/>}/>
         <Route path="/userList" element={<AdminUserList/>}/>
         <Route path="/planList" element={<AdminPlans/>}/>
        </Route>
        <Route element={<PrivateRoute/>}>
         <Route path="/profile" element={<Profile/>}/>
         <Route path="/editProfile" element={<EditProfile/>}/>
         <Route path="/suggestions" element={<Suggestions/>}/>
         <Route path="/interests" element={<Interests/>}/>
         <Route path="/acceptedList" element={<AcceptedList/>}/>

        </Route>
    </Routes>
  
  </Router>
}
