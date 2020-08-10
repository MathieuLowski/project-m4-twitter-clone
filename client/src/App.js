import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Homefeed from "./HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import GlobalStyles from "./GlobalStyles";
import Sidebar from "./Sidebar";
import { CurrentUserContext } from "./CurrentUserContext";
import ErrorScreen from "./ErrorScreen";

function App() {
  const { currentUser, status } = useContext(CurrentUserContext);

  if (status === "idle") {
    return (
      <Wrapper>
        <Router>
          <GlobalStyles />
          <Sidebar currentUser={status === "idle" ? currentUser : null} />
          <Switch>
            <Route exact path="/">
              <Homefeed />
            </Route>
            <Route exatch path="/notifications">
              <Notifications />
            </Route>
            <Route exact path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route exact path="/tweet/:tweetId">
              <TweetDetails />
            </Route>
            <Route exact path="/:profileId">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </Wrapper>
    );
  } else return <ErrorScreen />;
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: wrap;
`;

export default App;
