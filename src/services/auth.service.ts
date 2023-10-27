import {urls} from "../constants";
import {ILogin, ILogRegData, IRegister} from "../interfaces";
import {IRes} from "../types";
import {axiosService} from "./axios.service";

class AuthService {
   login(params: ILogin): IRes<ILogRegData> {
      return axiosService.post(urls.auth.login, params);
   }

   register(params: IRegister): IRes<ILogRegData> {
      return axiosService.post(urls.auth.register, params);
   }

   getMe(): IRes<ILogRegData> {
      return axiosService.get(urls.auth.me);
   }
}

export const authService = new AuthService();