import { useSelector } from 'react-redux'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import { RootState } from '../../redux/store'
import { Maybe, User } from '../../@Types'
import { useUser } from '../../redux/userSlice'

export default function AuthPage() {

    const user = useUser()
    const {pathname} = useLocation()
    if(user && pathname != "/auth/profile") {
        return <Navigate to="/"/>
    }
    return <>
        <Outlet/>
    </>
}