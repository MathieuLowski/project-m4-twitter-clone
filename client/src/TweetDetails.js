import React, { useState, useEffect } from "react";
import ActionBar from "./Actionbar";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";

const TweetDetails = () => {
  const [singleTweet, setSingleTweet] = useState(null);
  const [status, setStatus] = useState("loading");
  const { tweetId } = useParams();

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //setSingleTweet(Object.values(data.tweet));
        setSingleTweet(data);
        setStatus("idle");
      })
      .catch((err) => {
        console.log("this is the error", err);
        setStatus("error");
      });
  }, [tweetId]);
  console.log("all", singleTweet);

  if (status === "idle") {
    const tweet = singleTweet.tweet;
    console.log(tweet);
    return (
      <Wrapper>
        <div>
          <TopTweetPart>
            <ProfPic src={tweet.author.avatarSrc} />
            <p>
              {" "}
              <strong>{tweet.author.displayName}</strong>
            </p>
            <p>@ {tweet.author.handle}</p>
            <p>{moment(tweet.timestamp).format("MMM do")}</p>
          </TopTweetPart>
          <p>{tweet.author.bio}</p>
          <p>{tweet.author.status}</p>
          {tweet.media[0] && <img src={tweet.media[0].url} />}
        </div>
        <ActionBar />
      </Wrapper>
    );
  } else return <div>Error</div>;
};

const ProfPic = styled.img`
  width: 50px;
  border-radius: 3rem;
`;
const TopTweetPart = styled.div`
  /* background-color: #cffaff; */
  display: flex;
  flex-direction: row;
`;
const Wrapper = styled.div`
  border-radius: 33px;
  margin-top: 5px;
  margin-bottom: 5px;

  width: 600px;
  box-shadow: 13px 11px 20px 0px rgba(192, 198, 214, 0.39);
`;
export default TweetDetails;
{
  /* {singleTweet.length &&
          singleTweet.map((info) => (
            <div>
              <img src={info.avatarSrc} />
              <strong>
                <p>{info.displayName}</p>
              </strong>
              <p>@{info.handle} </p>
              <p>{info.bio}</p>
            </div>
          ))} */
}
