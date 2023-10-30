const baseURLServer = process.env.REACT_APP_API_URL || "http://localhost:4444";

const urls = {
   auth: {
      login: "/auth/login",
      register: "/auth/register",
      me: "/auth/me"
   },
   post: {
      getAll: "/posts",
      create: "/posts",
      getTags: "/posts/tags",
      byId: (id: string): string => `/posts/${id}`,
      deletePost: (id: string): string => `/posts/${id}`,
      upload: "/upload"
   }
};

export {
   baseURLServer,
   urls
};