"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
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
exports.default = typeDefs;
