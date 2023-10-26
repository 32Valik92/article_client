const baseURLServer = "http://localhost:4444";

const urls = {
   auth: {
      login: "/auth/login",
      register: "/auth/register",
      me: "/auth/me"
   },
   post: {
      getAll: "/posts",
      getTags: "/tags",
      deletePost: (id: string): string => `/posts/${id}`,
   }
};

export {
   baseURLServer,
   urls
};