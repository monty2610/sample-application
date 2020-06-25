import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_BLOG, FETCH_BLOG_BY_ID } from "../../queries";
import { useParams } from "react-router-dom";
import { BlogPost, EditBlogPostInput } from "../../types";
import CreateEditForm from "../CreateEditForm";
import { Alert } from "reactstrap";

const EditPost = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const { loading, error, data } = useQuery(FETCH_BLOG_BY_ID, {
    variables: {
      id,
    },
  });

  const [updatePost] = useMutation<
    { updateBlog: BlogPost },
    { blogPost: EditBlogPostInput }
  >(UPDATE_BLOG, {
    onCompleted: () => {
      setNotification({
        message: "Post updated successfully",
        type: "success",
      });
    },
  });

  if (loading) {
    return <p>...fetching post</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const onSubmitHandler = ({ title, content }) => {
    updatePost({
      variables: {
        blogPost: {
          id,
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
      <CreateEditForm
        onSubmitHandler={onSubmitHandler}
        initialValues={data.blog}
      />
    </>
  );
};

export default EditPost;
