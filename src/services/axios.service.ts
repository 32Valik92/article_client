import axios from "axios";

import {baseURLServer} from "../constants";

const axiosService = axios.create({baseURL: baseURLServer});

axiosService.interceptors.request.use((config) => {
   config.headers.Authorization = window.localStorage.getItem("token");

   return config;
});

export {
   axiosService
};