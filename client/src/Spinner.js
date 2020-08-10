import React from "react";
//import Icon from "react-icons-kit";
//import { refresh as loader } from "react-icons-kit/feather/refreshCw";
import { FiLoader } from "react-icons/fi";
import styled, { keyframes } from "styled-components";

const Spinner = () => {
  return (
    <SpinnerWheel>
      <FiLoader />
    </SpinnerWheel>
  );
};

const rotate = keyframes`
0%{
  transfrom: rotate(0deg);
}
80%{
  transfrom: rotate(400deg)
}
100%{
  transfrom: rotate(360deg)
}
`;
const SpinnerWheel = styled.div`
  display: flex;
  justify-content: center;
  svg {
    font-size: 4rem;
    animation: ${rotate} 1500ms linear infinite;
  }
`;

export default Spinner;
