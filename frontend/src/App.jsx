import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' 
import Home from './pages/Home'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    <Footer/>
  </Router>
}
