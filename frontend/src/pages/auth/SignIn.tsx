import { useDispatch, useSelector } from "react-redux"
import { SignInForm, SignInFormScheme } from "../../@Types"
import Form from "../../components/Form/Form"
import { AppDispatch, RootState } from "../../redux/store"
import { signInUser } from "../../redux/userSlice"




const signInFields = [
    {name: "email", required:true, type:'email'},
    {name: "password", required:true, type:'password'},
]
export default function SignInPage() {

    const dispatch = useDispatch<AppDispatch>()

    const loading = useSelector<RootState, boolean>(state => state.userSlice.loading)
    const onSubmit = (form: SignInForm) => {
        dispatch(signInUser(form))
    }
    return <div>
        Sign In
        <Form
        zObject={SignInFormScheme}
        submitText="Sign In"
        loading={loading}
        loadingText="Signing in.."
        fields={signInFields}
        onSubmit={onSubmit}/>
    </div>
}