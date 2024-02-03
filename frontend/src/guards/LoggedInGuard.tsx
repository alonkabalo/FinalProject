import { FunctionComponent } from "react";
import { useUser } from "../redux/userSlice";
import { Link } from "react-router-dom";


export default function LoggedInGuard<T>(Component: FunctionComponent<T>) {

    return function useGuard(props : T) {

        const user = useUser()
        if(user === undefined) {
            return null
        }
        if(user === null) {
            return <div>Please sign in to view this page <Link to={'/auth/signin'}> Sign in</Link></div>
        }

        return <Component {...props as any}/>
    }
}