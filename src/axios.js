import axios from "axios";


const API = axios.create({
    baseURL:"https://hrportal-kzxr6.ondigitalocean.app/"
})

export default API;