import { IUser } from "./user.interface";

export interface IPost {
  _id?: string
  title: string;
  text: string;
  tags: string;
  viewsCount?: number;
  user?: IUser;
  imageUrl?: string;
}
