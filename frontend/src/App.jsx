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
import Example from './pages/Example';
import AdminPlanList from './pages/admin/AdminPlanList';
import AdminCreatePlan from './pages/admin/AdminCreatePlan';
import AdminEditPlan from './pages/admin/AdminEditPlan';
import Plans from './pages/user/Plans';
import Success from './pages/user/Success';
import Cancel from './pages/user/Cancel';
import AdminSubscriptionList from './pages/admin/AdminSubscriptionList';
// import ChatWindow from './pages/user/ChatWindow';
import Userlogin from './pages/user/Userlogin';
import UserSignup from './pages/user/UserSignup';
import UserOTPVerification from './pages/user/UserOTPVerification';
import ForgotPassword from './pages/user/ForgotPassword';
import ChangePassword from './pages/user/ChangePassword';
import ProfileChangePassword from './pages/user/ProfileChangePassword';
import ProfileChangeEmailAddress from './pages/user/ProfileChangeEmailAddress';
import VerifyEmailAddress from './pages/user/VerifyEmailAddress';
import UpdateProfile from './pages/user/UpdateProfile';
import UserHome from './pages/user/UserHome';
import HomePage from './pages/user/HomePage';
import AddProfile from './pages/user/AddProfile';
import AdminViewProfile from './pages/admin/AdminViewProfile'
import ShowContact from './pages/user/ShowContact';
import Notifications from './pages/user/Notifications';
// import { ChatProvider } from './context/ChatContext';
import Messenger from './pages/user/Messenger';
import MemberProfile from './pages/user/MemberProfile';
import AdminNotifications from './pages/admin/AdminNotifications';
import MyPlan from './pages/user/MyPlan';
import VideoChat from './pages/user/VideoChat';
import AdvancedSearch from './pages/user/AdvancedSearch';
import AdminReportAbuse from './pages/admin/AdminReportAbuse';


export default function App() {
  return <Router>
    {/* <Header/> */}
    <ToastContainer position="top-right" />
    <Routes>
    {/* <ChatProvider> */}
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/home" element={<UserHome/>}/> */}
        <Route path="/home" element={<HomePage/>}/>

        <Route path="/usersignup" element={<Signup/>}/>
        {/* <Route path="/otpVerify" element={<OtpVerify/>}/> */}
        <Route path="/userlogin" element={<Login/>}/>
        <Route path="/adminLogin" element={<AdminLogin/>}/>
        <Route path="/example" element={<Example/>}/>
        <Route path="/login" element={<Userlogin/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/otpVerify" element={<UserOTPVerification/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/changePassword/:email" element={<ChangePassword/>}/>
        <Route path="/addProfile" element={<AddProfile/>}/>
      
        <Route element={<AdminPrivateRoute/>}>
         <Route path="/dashboard" element={<AdminDashboard/>}/>
         <Route path="/userList" element={<AdminUserList/>}/>
         <Route path="/planList" element={<AdminPlanList/>}/>
         <Route path="/createPlan" element={<AdminCreatePlan/>}/>
         <Route path="/editPlan/:id" element={<AdminEditPlan/>}/>
         <Route path="/subscriptionlist" element={<AdminSubscriptionList/>}/>
         <Route path="/viewProfile/:id" element={<AdminViewProfile/>}/>
         <Route path="/AdminNotifications/:notificationId" element={<AdminNotifications/>}/> 
         <Route path="/abuseReportList" element={<AdminReportAbuse/>}/> 
         
        </Route>
        <Route element={<PrivateRoute/>}>
         <Route path="/profile" element={<Profile/>}/>
         <Route path="/editProfile" element={<EditProfile/>}/>
         <Route path="/updateProfile" element={<UpdateProfile/>}/>
         <Route path="/changeProfilePassword" element={<ProfileChangePassword/>}/>
         <Route path="/changeEmailAddress" element={<ProfileChangeEmailAddress/>}/>
         <Route path="/verifyEmailAddress" element={<VerifyEmailAddress/>}/>
         <Route path="/suggestions" element={<Suggestions/>}/>
         <Route path="/interests" element={<Interests/>}/>
         <Route path="/acceptedList" element={<AcceptedList/>}/>
         <Route path="/plans" element={<Plans/>}/>
         <Route path="/success" element={<Success/>}/>
         <Route path="/cancel" element={<Cancel/>}/>
         <Route path="/showContact" element={<ShowContact/>}/>
         <Route path="/notifications/:notificationId" element={<Notifications/>} />
         <Route path="/messenger" element={<Messenger/>}/>
         <Route path="/memberProfile/:id" element={<MemberProfile/>}/>
         <Route path="/myPlan" element={<MyPlan/>}/>
         <Route path="/videoCall" element={<VideoChat/>}/>
         <Route path="/advancedSearch" element={<AdvancedSearch/>}/>
         
        </Route>
    {/* </ChatProvider> */}

    </Routes>
  
  </Router>
}
