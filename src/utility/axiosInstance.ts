import axios, { AxiosInstance } from 'axios'

const springAxiosInst: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACK_IP,
    timeout: 2500
})

export default springAxiosInst