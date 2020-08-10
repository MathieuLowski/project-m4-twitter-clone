import React from "react";
import styled from "styled-components";
import { FaBomb, FaBeer } from "react-icons/fa";

const ErrorScreen = () => {
  return (
    <Wrapper>
      <FaBomb />
      <strong>
        <h2>An Unknown error has occured.</h2>
      </strong>
      <p>
        Please try refreshing the page, or take a moment and start purrring...
      </p>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
export default ErrorScreen;
