import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateEditForm from "../index";

const getContainer = () => {
  return render(
    <BrowserRouter>
      <CreateEditForm />
    </BrowserRouter>
  );
};

describe("CreateEditForm component", () => {
  let container;
  let onSubmitHandler;
  beforeEach(() => {
    onSubmitHandler = jest.fn();
    container = render(
      <BrowserRouter>
        <CreateEditForm onSubmitHandler={onSubmitHandler} />
      </BrowserRouter>
    );
  });

  it("should match snapshot correctly", () => {
    const { asFragment } = container;

    expect(asFragment()).toMatchSnapshot();
  });
});

describe("CreateEditForm component with initialValues prop", () => {
  let container;
  let onSubmitHandler;

  beforeEach(() => {
    onSubmitHandler = jest.fn();
    container = render(
      <BrowserRouter>
        <CreateEditForm
          initialValues={{ title: "test post", content: "test content" }}
          onSubmitHandler={onSubmitHandler}
        />
      </BrowserRouter>
    );
  });

  it("should match snapshot correctly", () => {
    const { asFragment } = container;

    expect(asFragment()).toMatchSnapshot();
  });

  it("initial values should be populated correctly", () => {
    const { getByPlaceholderText } = container;
    expect(getByPlaceholderText("Write a Title")).toHaveValue("test post");
    expect(getByPlaceholderText("Content goes here...")).toHaveValue(
      "test content"
    );
  });

  it("onSubmit should call the onSubmitHandler prop with updated content", () => {
    const { getByPlaceholderText, getByRole } = container;
    fireEvent.change(getByPlaceholderText("Write a Title"), {
      target: {
        value: "new post",
      },
    });

    fireEvent.change(getByPlaceholderText("Content goes here..."), {
      target: {
        value: "new content",
      },
    });

    fireEvent.click(
      getByRole("button", {
        name: "Submit",
      })
    );

    expect(onSubmitHandler).toHaveBeenCalledWith({
      title: "new post",
      content: "new content",
    });
  });
});
