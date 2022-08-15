import axios from "axios";

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers:{
        "Content-type":"application/json"
    }
});

export default httpClient;