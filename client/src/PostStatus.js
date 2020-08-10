import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";

const PostStatus = ({ newPost, setNewPost }) => {
  const [status, setStatus] = useState(""); //test writting
  const [char, setChar] = useState(280); //character count
  const { currentUser } = useContext(CurrentUserContext);
  const [off, setOff] = useState(true); //buttonManager
  const [color, setColor] = useState("black"); //color picker
  console.log(currentUser);

  useEffect(() => {
    if (char >= 280 && char < 0) {
      setOff(true);
    } else {
      setOff(false);
    }
    if (char < 55 && char >= 0) {
      setColor("yellow");
    } else if (char < 0) {
      setColor("red");
    } else {
      setColor("black");
    }
  }, [char]);

  const buttonCLick = () => {
    setStatus("");
    fetch("/api/tweet", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("Status Update" + status);
        setNewPost(!newPost);
      });
  };

  return (
    <Wrapper>
      <StatusBox>
        {/* <Userpic src={currentUser.profile.avatarSrc} /> */}
        <Textarea
          type="text"
          placeholder="What's on you mind..."
          onChange={(ev) => {
            setChar(280 - ev.target.value.length);
          }}
        />
      </StatusBox>
      <CounterMeeow>
        <p style={{ color: color }}>{char}</p>
        <Button
          disabled={off}
          onClick={() => {
            buttonCLick();
          }}
        >
          Meaow
        </Button>
      </CounterMeeow>
    </Wrapper>
  );
};

const CounterMeeow = styled.div`
  display: flex;
  padding: 15px;
  font-weight: bold;

  justify-content: flex-end;
  margin: 10px;
`;
const StatusBox = styled.div`
  display: flex;
`;
const Textarea = styled.textarea`
  resize: none;
  height: 100px;
  width: 600px;
`;
const Userpic = styled.img`
  width: 50px;
  border-radius: 3rem;
`;
const Wrapper = styled.div``;
const Button = styled.button`
  font-weight: bold;
  font-size: 15px;
  color: white;
  background-color: #f4a1ff;
  border-radius: 33px;
  width: 100px;
  margin-left: 10px;
  :hover {
    background-color: #f4a1ff13;
    color: #f4a1ff;
  }
`;

export default PostStatus;
