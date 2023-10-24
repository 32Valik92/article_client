import axios from "axios";

import {baseURLServer} from "../constants";

const axiosService = axios.create({baseURL: baseURLServer});

export {
   axiosService
};