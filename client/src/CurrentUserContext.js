import React, { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [homeFeed, setHomeFeed] = useState(null);
  const [homeFeedStatus, setHomeFeedStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        console.log("Context data: ", data);
        setCurrentUser(data);
        console.log(currentUser);

        data.profile ? setStatus("idle") : setStatus("loading");
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, status, homeFeed, homeFeedStatus }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
export default CurrentUserProvider;
// useEffect(() => {
//   fetch("/api/me/home-feed") //endpoint for all the feeds
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("HomeFeed data:", data);
//       console.log(data.tweetsById);
//       setPosts(data.id);
//       console.log(posts);
//     });
// }, []);
