import { FunctionComponent } from "react";
import { useUser } from "../redux/userSlice";
import { Link } from "react-router-dom";
import { isAdmin } from "../utils";


export default function AdminGuard<T>(Component: FunctionComponent<T>) {

    return function useGuard(props : T) {

        const user = useUser()
        if(user === undefined) {
            return null
        }
        if(user === null) {
            return <div>Please sign in to view this page <Link to={'/auth/signin'}> Sign in</Link></div>
        }
        if(!isAdmin(user)) {
            return <div>You are not authorized to view this page.<br/> <Link to={'/'}> Back to home</Link></div>
        }

        return <Component {...props as any}/>
    }
}