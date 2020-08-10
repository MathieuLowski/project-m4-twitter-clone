import React, { useContext } from "react";
import PostHomeFeed from "./PostsHomeFeed";
import { CurrentUserContext } from "./CurrentUserContext";
import Spinner from "./Spinner";
import styled from "styled-components";
import { COLORS } from "./constants";

const Homefeed = () => {
  const { status } = useContext(CurrentUserContext);
  console.log(status);

  if (status === "idle") {
    return (
      <Wrapper>
        <div>
          <h2 style={{ color: COLORS.primary }}>Home</h2>
        </div>
        <PostHomeFeed />
      </Wrapper>
    );
  } else return <Spinner />;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Homefeed;
