import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { FaCat } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import moment from "moment";
import PostHomeFeed from "./PostsHomeFeed";
import Spinner from "./Spinner";

const Profile = () => {
  // const userInfo = React.useContext(CurrentUserContext);
  // const userData = Object.values(userInfo);
  // const { currentUser } = useContext(CurrentUserContext);
  //console.log(currentUser);
  const [userProfile, setUserProfile] = useState(null); //change name
  const [profileFeed, setProfileFeed] = useState(null);
  const [status, setStatus] = useState("loading");
  const { profileId } = useParams();
  console.log(status);
  console.log("ff", userProfile);

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserProfile(data);
        setStatus("idle");
      });
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //setUserProfile(data);
        setStatus("idle");
      });
  }, []);

  if (status === "idle") {
    const user = userProfile.profile;
    console.log(user);
    return (
      <div>
        <TopImages>
          <Banner src={user.bannerSrc} />
          <ProfPic src={user.avatarSrc} />
        </TopImages>
        <TopInfo>
          <p>
            <strong>{user.displayName}</strong>
          </p>
          <p>@ {user.handle}</p>
          <p>{user.bio}</p>
          <First>
            <p>
              <FiMapPin />
              {user.location}
            </p>

            <p>
              <FiCalendar />
              {user.joined}
            </p>
          </First>
          <Second>
            <p>{user.numFollowing} Following</p>
            <p>{user.numFollowers} Followers</p>
          </Second>
        </TopInfo>
        <BottomFeed>
          <PostHomeFeed />
        </BottomFeed>
      </div>
    );
  } else
    return (
      <div>
        <Spinner />
      </div>
    );
};

const TopImages = styled.div`
  display: flex;
  flex-direction: column;
`;
const Banner = styled.img`
  height: 350px;
`;
const ProfPic = styled.img`
  position: absolute;
  top: 8;
  left: 8;
  margin-top: 240px;
  margin-left: 25px;
  border-radius: 10rem;
  border: 3px solid white;
  width: 200px;
`;
const TopInfo = styled.div`
  margin-top: 130px;
`;
const First = styled.div`
  display: flex;
  flex-direction: row;
`;
const Second = styled.div`
  display: flex;
  flex-direction: row;
`;
const BottomFeed = styled.div`
  width: 600px;
`;
const Wrapper = styled.div``;
export default Profile;

///////////////////////////////////////////////////////////////////////////////////

// const Profile = () => {
//   const userInfo = React.useContext(CurrentUserContext);
//   const userData = Object.values(userInfo);
//   const { currentUser } = useContext(CurrentUserContext);

//   const [handle, setHandle] = useState(null);
//   const [status, setStatus] = useState("loading");
//   const { profileId } = useParams();
//   console.log(currentUser);
//   console.log(status);
//   useEffect(() => {
//     fetch(`/api/${profileId}/profile`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setHandle(data);
//         setStatus("idle");
//       });
//   }, []);

//   if (status === "idle") {
//     console.log(currentUser);

//     return (
//       <div>
//         {userData[0] &&
//           userData.map((info) => (
//             <div>
//               <Banner src={info.bannerSrc} />
//               <ProfPic src={info.avatarSrc} />
//               <p>
//                 <strong>{info.displayName}</strong>
//               </p>
//               <p>{currentUser.handle}</p>
//               <p>{currentUser.location}</p>
//               <p>{currentUser.joined}</p>
//               <p>{info.numFollowing} Following</p>
//               <p>{info.numFollowers} Followers</p>
//             </div>
//           ))}
//       </div>
//     );
//   } else return <div>Still Loading</div>;
// };

// const Banner = styled.img`
//   height: 350px;
// `;
// const ProfPic = styled.img`
//   border-radius: 10rem;
//   border: 3px solid black;
// `;
// const Wrapper = styled.div``;
// export default Profile;
