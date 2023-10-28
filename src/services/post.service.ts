import {urls} from "../constants";
import {IPost, IPostFields} from "../interfaces";
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

   uploadImg(formData: FormData): IRes<{url: string}> {
      return axiosService.post(urls.post.upload, formData);
   }

   updateById(postId: string, fields: IPostFields): IRes<IPost> {
      return axiosService.patch(urls.post.byId(postId), fields);
   }

   create(fields: IPostFields): IRes<IPost> {
      return axiosService.post(urls.post.create, fields);
   }
}

export const postService = new PostService();