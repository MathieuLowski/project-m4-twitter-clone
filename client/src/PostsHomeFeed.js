import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import Actionbar from "./Actionbar";
import PostStatus from "./PostStatus";
import moment from "moment";
import { Link, useHistory, useParams } from "react-router-dom";
import Spinner from "./Spinner";

const PostHomeFeed = () => {
  const [posts, setPosts] = useState([]);
  const [indent, setIdent] = useState([]);
  const [newPost, setNewPost] = useState(false);
  const { currentUser, status } = useContext(CurrentUserContext);
  let history = useHistory();
  console.log(currentUser);
  console.log(status);

  useEffect(() => {
    fetch("/api/me/home-feed") //endpoint for all the feeds
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(Object.values(data.tweetsById));
        setIdent(data.tweetIds);
      });
  }, [newPost]);
  console.log("all", posts);
  console.log("more", indent);
  //posts === data----------tweet in map ===posts

  if (status === "idle") {
    return (
      //PostStatus allows the user to post a status in the genereal feed.
      // map renders all the tweets made by the accounts the user follows
      <Wrapper>
        <PostStatus newPost={newPost} setNewPost={setNewPost} />
        <div>
          {posts.length &&
            posts.map((tweet) => {
              return (
                <>
                  <Link to={`/tweet/${tweet.id}`}>
                    <MiniWrapper key={tweet.id}>
                      <TopTweetPart>
                        <Avatar src={tweet.author.avatarSrc} />
                        <SmallHeader>
                          <div
                            tabIndex="0"
                            onClick={() => {
                              history.push(`/${tweet.author.handle}`);
                            }}
                          >
                            <p>
                              <strong>{tweet.author.displayName}</strong>
                            </p>
                          </div>
                          <p> @{tweet.author.handle}</p>
                          <p>{moment(tweet.timestamp).format("MMM do")}</p>
                        </SmallHeader>
                      </TopTweetPart>
                      <p>{tweet.status}</p>
                      {tweet.media[0] && <Media src={tweet.media[0].url} />}
                      <Bar></Bar>
                    </MiniWrapper>
                  </Link>
                  <Actionbar
                    tweetId={tweet.id}
                    isLiked={tweet.isLiked}
                    numLikes={tweet.numLikes}
                  />
                </>
              );
            })}
        </div>
      </Wrapper>
    );
  } else return <Spinner />;
};
const Wrapper = styled.div``;

const SmallHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 10px;
`;
const TopTweetPart = styled.div`
  /* background-color: #cffaff; */
  display: flex;
  flex-direction: row;
`;
const Image = styled.img`
  border-radius: 10px;
`;
const MiniWrapper = styled.div`
  border-radius: 33px;
  margin-top: 5px;
  margin-bottom: 5px;

  width: 600px;
  box-shadow: 13px 11px 20px 0px rgba(192, 198, 214, 0.39);
`;
const Bar = styled.div``;
const Avatar = styled.img`
  width: 50px;
  border-radius: 3rem;
`;

const Media = styled.img`
  width: 350px;
  border-radius: 33px;
`;

///////////////////////////////////////////////////////////////////////////////////////////////////////

// const PostHomeFeed = () => {
//   const [status, setStatus] = useState("loading");
//   const [handle, setHandle] = useState(null);
//   //const { CurrentUser, status } = useContext(CurrentUserContext);
//   const [newPost, setNewPost] = useState(false);
//   console.log(handle);
//   //const tweetObject = handle.tweetsById;
//   //console.log(tweetObject);

//   useEffect(() => {
//     fetch("/api/me/home-feed") //endpoint for all the feeds
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setHandle(data);
//         setStatus("idle");
//       });
//   }, [newPost]);
//   console.log("all", handle);

//   return (
//     //PostStatus allows the user to post a status in the genereal feed.
//     // map renders all the tweets made by the accounts the user follows
//     <>
//       <PostStatus newPost={newPost} setNewPost={setNewPost} />
//     </>
//   );
// };

export default PostHomeFeed;
