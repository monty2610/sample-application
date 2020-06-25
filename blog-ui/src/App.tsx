import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { Container } from "reactstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";

function App() {
  const [client, setClient] = useState();

  useEffect(() => {
    const clientInstance = new ApolloClient({
      cache: new InMemoryCache({}),
      link: new HttpLink({
        uri: "http://localhost:4000",
      }),
    });

    setClient(clientInstance);
  }, []);

  if (client) {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Container>
            <header className="App-header mb">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
            <Switch>
              <Route exact path="/">
                <BlogList />
              </Route>
              <Route exact path="/post/create">
                <CreatePost />
              </Route>
              <Route exact path="/post/:id">
                <BlogPost />
              </Route>
              <Route exact path="/post/edit/:id">
                <EditPost />
              </Route>
            </Switch>
          </Container>
        </BrowserRouter>
      </ApolloProvider>
    );
  }

  return null;
}

export default App;
