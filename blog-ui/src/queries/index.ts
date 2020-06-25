import { gql } from "@apollo/client";

export const FETCH_BLOGS = gql`
  query {
    blogs {
      id
      title
    }
  }
`;

export const FETCH_BLOG_BY_ID = gql`
  query FETCH_BLOG_BY_ID($id: ID!) {
    blog(id: $id) {
      id
      title
      content
    }
  }
`;

export const CREATE_BLOG = gql`
  mutation CreateBlog($blogPost: blogPostInput!) {
    createBlog(blogPost: $blogPost) {
      id
      title
      content
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($blogPost: updateBlogPostInput!) {
    updateBlog(blogPost: $blogPost) {
      id
      title
      content
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      id
    }
  }
`;
