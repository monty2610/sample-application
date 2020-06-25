import React, { FC } from "react";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { FETCH_BLOG_BY_ID } from "../../queries";
import { Row, Col, Button } from "reactstrap";

const BlogPost: FC = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(FETCH_BLOG_BY_ID, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Row>
      <Col>
        <Button tag={Link} to={"/"} color="primary" size="sm">
          Back to Home
        </Button>
        <div className="justify-space-between">
          <h2>{data.blog.title}</h2>
          <div>
            <Button tag={Link} to={`/post/edit/${data.blog.id}`} size="sm">
              Edit
            </Button>
          </div>
        </div>
        <p>{data.blog.content}</p>
      </Col>
    </Row>
  );
};

export default BlogPost;
