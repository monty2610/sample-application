import { gql } from 'apollo-server';

const typeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    blogs: [Blog]
    blog(id: ID!): Blog
  }

  type Mutation {
    createBlog(blogPost: blogPostInput): Blog
    updateBlog(blogPost: updateBlogPostInput): Blog
    deleteBlog(id: ID!): Blog
  }

  input blogPostInput {
    title: String!
    content: String!
  }

  input updateBlogPostInput {
    id: ID!
    title: String
    content: String
  }
`;

export default typeDefs;
