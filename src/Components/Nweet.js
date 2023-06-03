import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "fbase";
import styled from "styled-components";
import { getAuth } from "firebase/auth";

const NweetContainer = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NweetContent = styled.div`
  h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
  }
  p {
    margin: 0;
    font-size: 0.5rem;
    font-weight: 300;
  }
`;

const NweetButtons = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const NweetForm = styled.form`
  margin-top: 1rem;

  input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.875rem;
  }

  input[type="submit"] {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

function Nweet({ e, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(e.text);

  const authUSer = getAuth();
  const user = authUSer.currentUser;
  const displayName = user.displayName;

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제 하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, "my-tweet", `${e.id}`));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, "my-tweet", `${e.id}`), {
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const value = event.target.value;
    setNewNweet(value);
  };

  return (
    <NweetContainer>
      {editing ? (
        <NweetForm onSubmit={onSubmit}>
          <input value={newNweet} onChange={onChange} required />
          <input type="submit" value={"Update"} />
          <button onClick={toggleEditing}>Cancel</button>
        </NweetForm>
      ) : (
        <NweetContent>
          <h4>{e.text}</h4>
          <p>"익명의 사용자"</p>
          {isOwner && (
            <NweetButtons>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </NweetButtons>
          )}
        </NweetContent>
      )}
    </NweetContainer>
  );
}

export default Nweet;
