import { ITokenPair } from "./token.interface";
import {IUser} from "./user.interface";

export interface ILogRegData {
  _id?: string;
  fullName?: string;
  email?: string;
  password?: string;
  avatarURL?: string;
  tokenPair?: ITokenPair;
}

export interface IDataResponseLogin{
  meta:{
    arg: ILogin
    requestId: string;
    requestStatus: string;
  },
  payload:ILogRegData;
  type: string;
}

export type ILogin = Pick<IUser, "email" | "password">;
export type IRegister = Pick<IUser, "fullName" | "email" | "password">;
