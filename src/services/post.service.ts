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
}

export const postService = new PostService();