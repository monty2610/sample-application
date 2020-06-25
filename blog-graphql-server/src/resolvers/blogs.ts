import BlogsAPI, { CreateBlogInput, UpdateBlogInput } from '../dataSources/Blog';

type Context = {
  dataSources: {
    blogsAPI: BlogsAPI;
  };
};

type blogArgs = {
  id: string;
};

type createBlogArgs = {
  blogPost: CreateBlogInput;
};

type updateBlogArgs = {
  blogPost: UpdateBlogInput;
};

const blogResolvers = {
  Query: {
    blogs: async (parent: object, {}, { dataSources }: Context) => {
      return dataSources.blogsAPI.fetchAllBlogs();
    },
    blog: (parent: object, { id }: blogArgs, { dataSources }: Context) => {
      return dataSources.blogsAPI.fetchBlogById(id);
    },
  },
  Mutation: {
    createBlog: async (parent: object, args: createBlogArgs, { dataSources }: Context) => {
      return dataSources.blogsAPI.createBlog(args.blogPost);
    },
    updateBlog: async (parent: object, args: updateBlogArgs, { dataSources }: Context) => {
      return dataSources.blogsAPI.updateBlog(args.blogPost);
    },
    deleteBlog: async (parent: object, args: blogArgs, { dataSources }: Context) => {
      return dataSources.blogsAPI.deleteBlog(args.id);
    },
  },
};

export default blogResolvers;
