import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';
import typeDefs from '../schemas';
import resolvers from '../resolvers';
import BlogsAPI from '../dataSources/Blog';

describe('Blogs queries', () => {
  let client;
  const blogsAPI = new BlogsAPI();

  beforeEach(() => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => ({ blogsAPI }),
    });

    client = createTestClient(server);
  });

  it('should return correct data for Blogs query', async () => {
    const mockBlogs = [{ id: '1', title: 'title', content: 'content' }];

    blogsAPI.fetchAllBlogs = jest.fn().mockResolvedValue(mockBlogs);

    const { query } = client;

    const {
      data: { blogs },
    } = await query({
      query: gql`
        {
          blogs {
            id
            title
            content
          }
        }
      `,
    });

    expect(blogs).toEqual(mockBlogs);
  });

  it('should return correct data for Blog query by Id', async () => {
    const mockBlog = { id: '1', title: 'title', content: 'content' };

    blogsAPI.fetchBlogById = jest.fn().mockResolvedValue(mockBlog);

    const { query } = client;

    const {
      data: { blog },
    } = await query({
      query: gql`
        {
          blog(id: "1") {
            id
            title
            content
          }
        }
      `,
    });

    expect(blog).toEqual(mockBlog);
  });

  it('should create a blog entry for createBlog mutation', async () => {
    const mockBlog = { id: '1', title: 'title', content: 'content' };

    blogsAPI.createBlog = jest.fn().mockResolvedValue(mockBlog);

    const { mutate } = client;

    const {
      data: { createBlog },
    } = await mutate({
      mutation: gql`
        mutation {
          createBlog(blogPost: { title: "last post", content: "tin the series" }) {
            id
            title
            content
          }
        }
      `,
    });

    expect(createBlog).toEqual(mockBlog);
  });

  it('should update a blog entry for updateBlog mutation', async () => {
    const mockBlog = { id: '1', title: 'title' };

    blogsAPI.updateBlog = jest.fn().mockResolvedValue(mockBlog);

    const { mutate } = client;

    const response = await mutate({
      mutation: gql`
        mutation {
          updateBlog(blogPost: { id: "1", title: "last post", content: "tin the series" }) {
            id
            title
          }
        }
      `,
    });

    const {
      data: { updateBlog },
    } = response;

    expect(updateBlog).toEqual(mockBlog);
  });
});
