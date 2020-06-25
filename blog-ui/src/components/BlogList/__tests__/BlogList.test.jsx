import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render, act, fireEvent } from "@testing-library/react";
import BlogList from "../index";
import { FETCH_BLOGS, DELETE_BLOG } from "../../../queries";
import { BrowserRouter } from "react-router-dom";

const getContainer = (mocks) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <BlogList />
      </BrowserRouter>
    </MockedProvider>
  );
};

describe("BlogList component", () => {
  it("should render loading state by default", async () => {
    let container;
    const mocks = [
      {
        request: {
          query: FETCH_BLOGS,
        },
        result: {
          data: {
            blogs: [{ id: "1", title: "test post" }],
          },
        },
      },
    ];

    await act(async () => {
      container = getContainer(mocks);
    });

    const { getByTestId } = container;

    expect(getByTestId(`loader`)).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  it("should render list of blogs correctly", async () => {
    let container;
    const mocks = [
      {
        request: {
          query: FETCH_BLOGS,
        },
        result: {
          data: {
            blogs: [{ id: "1", title: "test post" }],
          },
        },
      },
    ];

    await act(async () => {
      container = getContainer(mocks);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const { getByTestId } = container;

    expect(getByTestId(`blog-1`)).toBeInTheDocument();
  });

  it("delete should remove blog from the list", async () => {
    let container;
    const mocks = [
      {
        request: {
          query: FETCH_BLOGS,
        },
        result: {
          data: {
            blogs: [{ cid: "1", title: "test post" }],
          },
        },
      },
      {
        request: {
          query: DELETE_BLOG,
          variables: {
            id: 1,
          },
        },
        result: {
          data: {
            deleteBlog: {
              id: "1",
            },
          },
        },
      },
    ];

    await act(async () => {
      container = getContainer(mocks);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const { queryByTestId, getByRole } = container;

    fireEvent.click(
      getByRole("button", {
        name: "Delete",
      })
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(queryByTestId(`blog-1`)).not.toBeInTheDocument();
  });
});
