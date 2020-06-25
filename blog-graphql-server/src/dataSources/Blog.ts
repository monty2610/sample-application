import { RESTDataSource } from 'apollo-datasource-rest';

export type CreateBlogInput = {
  title: string;
  content: string;
};

export type UpdateBlogInput = {
  id: string;
  title: string;
  content: string;
};

class BlogsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3200/';
  }

  async fetchAllBlogs() {
    return await this.get(`blogs`);
  }

  async fetchBlogById(id: string) {
    return await this.get(`blogs/${id}`);
  }

  async deleteBlog(id: string) {
    return await this.delete(`blogs/${id}`);
  }

  async createBlog(blog: CreateBlogInput) {
    const { title, content } = blog;
    const data = await this.post('blogs', { title, content });
    return data;
  }

  async updateBlog(blog: UpdateBlogInput) {
    const { id, title, content } = blog;
    const data = await this.put(`blogs/${id}`, { title, content });
    return data;
  }
}

export default BlogsAPI;
