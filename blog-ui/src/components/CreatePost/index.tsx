import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BLOG, FETCH_BLOGS } from "../../queries";

import { BlogPost, BlogPostInput } from "../../types";
import CreateEditForm from "../CreateEditForm";
import { Alert } from "reactstrap";

const CreatePost = () => {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });
  const [createPost] = useMutation<
    { createBlog: BlogPost },
    { blogPost: BlogPostInput }
  >(CREATE_BLOG, {
    onCompleted: () => {
      setNotification({
        message: "Post created successfully",
        type: "success",
      });
    },
    update: (cache, { data: { createBlog } }) => {
      const cachedBlogs = cache.readQuery({ query: FETCH_BLOGS });
      const { blogs } = cachedBlogs as { blogs: BlogPost[] };
      cache.writeQuery({
        query: FETCH_BLOGS,
        data: { blogs: blogs.concat([createBlog]) },
      });
    },
  });

  const onSubmitHandler = ({ title, content }) => {
    createPost({
      variables: {
        blogPost: {
          title,
          content,
        },
      },
    });
  };

  const onDismiss = () => {
    setNotification({
      message: "",
      type: "",
    });
  };

  return (
    <>
      {notification.message && (
        <Alert color={notification.type} isOpen toggle={onDismiss}>
          {notification.message}
        </Alert>
      )}
      <CreateEditForm onSubmitHandler={onSubmitHandler} />
    </>
  );
};

export default CreatePost;
