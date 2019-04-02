import axios from "axios";

const instance = axios.create({
    baseURL: 'http://ec2-35-183-134-10.ca-central-1.compute.amazonaws.com:8000'
});

export default instance;
