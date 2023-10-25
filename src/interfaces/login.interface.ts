import { ITokenPair } from "./token.interface";
import {IUser} from "./user.interface";

export interface ILogRegData {
  _id?: string;
  fullName: string;
  email: string;
  password?: string;
  avatarURL: string;
  tokenPair: ITokenPair;
}

export type ILogin = Pick<IUser, "email" | "password">;
export type IRegister = Pick<IUser, "fullName" | "email" | "password">;
