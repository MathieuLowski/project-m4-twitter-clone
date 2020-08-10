import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "./constants";
import { CurrentUserContext } from "./CurrentUserContext";
//import Profile from "./Profile";
import { FiHome, FiBell, FiBookmark, FiUser } from "react-icons/fi";

import { FaCat, FaRetweet } from "react-icons/fa";

const Sidebar = () => {
  const { currentUser, status } = useContext(CurrentUserContext);

  return (
    <Div>
      <Nav>
        <Ul>
          <Li>
            <StyledLink to="/" activeStyle={{ color: COLORS.primary }}>
              <FaCat />
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/" activeStyle={{ color: COLORS.primary }}>
              <FiHome />
              Home
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to={`/${currentUser.profile.handle}`}>
              <FiUser />
              Profile
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/notifications">
              <FiBell />
              Notifications
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/bookmarks">
              <FiBookmark />
              Bookmarks
            </StyledLink>
          </Li>
        </Ul>
      </Nav>
    </Div>
  );
};

const StyledLink = styled(Link)``;
const Div = styled.div`
  display: flex;
  width: 300px;
`;

const Nav = styled.nav`
  position: relative;
`;
const Ul = styled.ul`
  list-style-type: none;
  box-sizing: border-box;
`;

const Li = styled.li`
  font-size: 30px;
  width: 200px;
  padding: 30px;
  :hover {
    background-color: #f4a1ff33;
    border-radius: 33px;
  }
`;

export default Sidebar;
