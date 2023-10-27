import {urls} from "../constants";
import {IPost} from "../interfaces";
import {IRes} from "../types";
import {axiosService} from "./axios.service";

class PostService {
   getAll(): IRes<IPost[]> {
      return axiosService.get(urls.post.getAll);
   }

   getTags(): IRes<string[]> {
      return axiosService.get(urls.post.getTags);
   }

   deletePost(id: string): IRes<void> {
      return axiosService.delete(urls.post.deletePost(id));
   }

   getById(postId: string): IRes<IPost> {
      return axiosService.get(urls.post.byId(postId));
   }

   uploadImg(formData:any): IRes<any> {
      return axiosService.post(urls.post.upload, formData);
   }

   updateById(postId: string, fields: any): IRes<IPost> {
      return axiosService.patch(urls.post.byId(postId), fields);
   }

   create(fields: any): IRes<IPost> {
      return axiosService.post(urls.post.create, fields);
   }
}

export const postService = new PostService();