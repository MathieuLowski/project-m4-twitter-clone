import React, { useState } from "react";
import styled from "styled-components";
import { FiMessageSquare, FiHeart, FiShare } from "react-icons/fi";
import { FaRetweet } from "react-icons/fa";

const Actionbar = ({ tweetId, isLiked, numLikes }) => {
  console.log();
  const [tweetLiked, setTweetLiked] = useState(isLiked);
  const [likes, setLikes] = useState(numLikes);
  const handleLike = () => {
    if (tweetLiked) {
      fetch(`api/tweet/${tweetId}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ like: true }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTweetLiked(!tweetLiked);
          setLikes(likes + 1);
        });
    } else {
      fetch(`api/tweet/${tweetId}/like`, {
        method: "PUT",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({ like: false }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLikes(likes - 1);
          setTweetLiked(!tweetLiked);
        });
    }
  };

  return (
    <BarWrapper>
      <Comment>
        <FiMessageSquare />
      </Comment>
      <Share>
        <FaRetweet />
      </Share>
      <LikeAction>
        <Like onClick={handleLike}>
          <FiHeart style={{ fill: `${tweetLiked ? "red" : ""}` }} />
        </Like>
        <p>{numLikes}</p>
      </LikeAction>
      <Download>
        <FiShare />
      </Download>
    </BarWrapper>
  );
};
const BarWrapper = styled.div`
  padding: 25px;
  display: flex;
  flex-flow: wrap;

  justify-content: space-around;
`;
const LikeAction = styled.div`
  display: flex;
  margin: 5px;
`;
const Comment = styled.button`
  border-radius: 45px;
  width: 86px;
  background-color: white;
  border: none;
  :hover {
    background-color: #73f54033;
    border-radius: 45px;
  }
`;
const Share = styled.button`
  border-radius: 45px;
  width: 86px;
  background-color: white;
  border: none;
  :hover {
    background-color: #66e0ff33;
    border-radius: 45px;
  }
`;
const Like = styled.button`
  border-radius: 45px;
  width: 86px;
  background-color: white;
  border: none;
  :hover {
    background-color: #e62b1233;
    border-radius: 45px;
  }
`;
const Download = styled.button`
  border-radius: 45px;
  width: 86px;
  background-color: white;
  border: none;
  :hover {
    background-color: #fff83b33;
    border-radius: 45px;
  }
`;

export default Actionbar;
