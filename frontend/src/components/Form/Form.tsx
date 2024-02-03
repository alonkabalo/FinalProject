import { FormEvent, useCallback, useEffect, useState } from "react"
import React from "react"
import { ClipLoader } from "react-spinners"
import { ZodObject } from "zod"
import { PRIMARY_GREEN } from "../../utils"

type FormField = {name: string, type:string, required:boolean}
type FormProps<T> = { 
    fields: FormField[], 
    loading?:boolean,
    loadingText?:string
    zObject: ZodObject<any>,
    submitText: string, onSubmit: (t: T) => void , className?:string}
export default function Form<T>({ fields, submitText, className, zObject, onSubmit,loading,loadingText } : FormProps<T>) {

    const [errors, setErrors] = useState(new Map())
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let allFields  = Object.fromEntries(new FormData(e.target as any).entries())
        let parsedFields = zObject.safeParse(allFields)
        if(parsedFields.success) {
            onSubmit(parsedFields.data as T)
        } else {
            const errors = Object.entries(parsedFields.error.formErrors.fieldErrors)
            const errorMap = new Map()
           for( let [errorField, errorMessage] of errors) {
                if(errorMessage)
                    errorMap.set(errorField, errorMessage[0])
           }
           setErrors(errorMap)
        }
    }
  
    const SubmitButton = useCallback(() => {
        if(loading) {
            return <button disabled className="loading">{loadingText ?? "Loading.."}</button>
        } else  {
            return <button>{submitText ?? "Submit"}</button>
        }
    },[loading, loadingText, submitText])

    return <form onSubmit={submit} className={'basic-form ' + (className ?? "")}>
            {React.Children.toArray(fields.map(field => <div>

                <label>{field.name[0].toUpperCase() + field.name.slice(1)}</label>
                <input onChange={() => {
                    if(errors.size > 0)
                        setErrors(new Map())
                }} placeholder={`Enter ${field.name}`} name={field.name} type={field.type} required={field.required}/>
                {errors.has(field.name) && <span className="error">{errors.get(field.name)!}</span>}
                {}
            </div>))}
           <SubmitButton/>
      <center style={{opacity: loading ? '1': '0'}}>
        <ClipLoader
            color={PRIMARY_GREEN}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
       </center>
    </form>
}