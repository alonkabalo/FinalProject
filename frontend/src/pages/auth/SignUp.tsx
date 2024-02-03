import { useState } from "react";
import { SignUpForm, SignUpFormScheme } from "../../@Types";
import Form from "../../components/Form/Form";
import { signUp } from "../../services/userService";
import { isErrorResponse, wait } from "../../utils";
import { useNavigate } from "react-router";





const signUpFields = [
    {name: "email", required:true, type:'email'},
    {name: "password", required:true, type:'password'},
    {name: "name", required:true, type:'text'}
]



export default function SignUpPage() {
    const [error,setError] = useState()
    const [loading,setLoading] = useState(false)
    const nav = useNavigate()
    const onSubmit = async (form: SignUpForm) => {
    try {
        setLoading(true)
        await wait()
        const response = await signUp(form)
        if(!isErrorResponse(response)) {
            nav("/auth/signin")
        }
    } catch(e:any) {
        setError(e.message)
    }
    setLoading(false)
    }
    return <div>
        Sign up
        <Form 
        zObject={SignUpFormScheme}
        submitText="Sign up"
        loading={loading}
        loadingText="Signing up.."
        fields={signUpFields}
        onSubmit={onSubmit}/>
        {error && <div className="error">{error}</div>}
    </div>
}