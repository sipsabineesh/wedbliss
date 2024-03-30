import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' 
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

export default function App() {
  return <Router>
    {/* <Header/> */}
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="otpVerify" element={<OtpVerify/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<AdminPrivateRoute/>}>
         <Route path="/dashboard" element={<AdminDashboard/>}/>
         <Route path="/userList" element={<AdminUserList/>}/>
        </Route>
        <Route element={<PrivateRoute/>}>
         <Route path="/profile" element={<Profile/>}/>
        </Route>
    </Routes>
    <Footer/>
  </Router>
}
