import axios from "axios"

const instance = axios.create({
    timeout:3000,
})

instance.interceptors.request.use(config =>{
    return config
},error => {
    console.log(error)
})

instance.interceptors.response.use(res =>{
    let result = {}
    if(res.status === 200){
        result.status = res.status
        result.data = res.data
    }
    return result
},error => {
    console.log(error)
})

export default instance

