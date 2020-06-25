import React, { useState, FC } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";

type Blog = {
  title: string;
  content: string;
};
type FormProps = {
  initialValues?: Blog;
  onSubmitHandler: (updatedContent: Blog) => void;
};

const CreateEditForm: FC<FormProps> = ({ initialValues, onSubmitHandler }) => {
  const [title, setTitle] = useState(
    (initialValues && initialValues.title) || ""
  );
  const [content, setContent] = useState(
    (initialValues && initialValues.content) || ""
  );

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const element = event.target as HTMLInputElement;
    if (element.name === "title") {
      setTitle(element.value);
    } else if (element.name === "content") {
      setContent(element.value);
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title && content) {
      onSubmitHandler({ title, content });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          name="title"
          id="title"
          placeholder="Write a Title"
          value={title}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="content">Content</Label>
        <Input
          type="textarea"
          name="content"
          id="content"
          placeholder="Content goes here..."
          value={content}
          onChange={onInputChange}
        />
      </FormGroup>
      <div className="align-right">
        <div>
          <Button to={"/"} tag={Link} className="mr" size="sm">
            Back
          </Button>

          <Button type="submit" size="sm" color="primary">
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default CreateEditForm;
