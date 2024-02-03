import { Axios } from "axios";

const httpClient = new Axios({
    baseURL: "http://localhost:5000/",
    headers: {
        'Content-Type' : 'application/json'
    }
})

httpClient.interceptors.request.use((request) => {
    const  token = localStorage.getItem('token')
    if(token) {
        request.headers.Authorization = `Bearer ${token}`
    }
    return request
})
export default httpClient