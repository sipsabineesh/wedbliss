import { useSelector } from "react-redux"
import { Outlet,Navigate } from 'react-router-dom'

export default function AdminPrivateRoute() {
    const {adminUser} = useSelector(state => state.admin)

  return  adminUser ? <Outlet/> : <Navigate to={'/adminLogin'}/>
  
}
