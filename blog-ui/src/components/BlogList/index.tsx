import React, { FC } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_BLOGS, DELETE_BLOG } from "../../queries";
import { ListGroup, ListGroupItem, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

type BlogPost = {
  id: string;
  title: string;
  content: string;
};

const BlogList: FC = () => {
  const { loading, error, data } = useQuery(FETCH_BLOGS);
  const [deletePost] = useMutation<{ deleteBlog: BlogPost }, { id: string }>(
    DELETE_BLOG,
    {
      update: (cache, { data: { deleteBlog } }) => {
        const cachedBlogs = cache.readQuery({ query: FETCH_BLOGS });
        const { blogs } = cachedBlogs as { blogs: BlogPost[] };
        const updatedBlogs = blogs.filter((blog) => blog.id !== deleteBlog.id);
        cache.writeQuery({
          query: FETCH_BLOGS,
          data: {
            blogs: updatedBlogs,
          },
        });
      },
    }
  );

  const deletePostHandler = (id) => {
    deletePost({
      variables: {
        id,
      },
    });
  };

  if (loading) {
    return <p data-testid="loader">Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Row className="mb">
        <Col className="align-right">
          <Button tag={Link} to={`/post/create`} color="primary" size="sm">
            Create Post
          </Button>
        </Col>
      </Row>
      <ListGroup>
        {data.blogs.map((blog: BlogPost) => (
          <ListGroupItem key={blog.id} data-testid={`blog-${blog.id}`}>
            <div className="justify-space-between">
              <Link to={`/post/${blog.id}`} className="align-center">
                {blog.title}
              </Link>
              <div>
                <Button
                  tag={Link}
                  to={`/post/edit/${blog.id}`}
                  size="sm"
                  className="mr"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deletePostHandler(blog.id)}
                  size="sm"
                  className="mr"
                >
                  Delete
                </Button>
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default BlogList;
