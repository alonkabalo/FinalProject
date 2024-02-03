import { ServerResponse } from "./@Types"


export function isErrorResponse<T> (response :ServerResponse<T>) {
    const status = Math.floor(response.status / 100)
    if(!response.data || status === 4  || status ===5 ) { // 4 , 5
        throw new Error(response.message)
    }
    return false
}
export const wait = () => new Promise((resolve) => setTimeout(resolve, 3000))

 
export function debounce<T, U>(f: (whatever: U) => Promise<T>, delay:number= 2000) {

    let timeout:NodeJS.Timer | undefined = undefined

    return {
        activate: (whatEver: U, resultCallback: (result: T | undefined) => void) => { 
            // if task was scheduled cancel it
            if(timeout) {
                clearTimeout(timeout)
                resultCallback(undefined)
            } 
            // reschedule task
            timeout = setTimeout(async () => {
                const result = await f(whatEver)
                resultCallback(result)
            }, delay) 
           
        }
    }
}

export const PRIMARY_GREEN = "#1BD760"