import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

function Nweet({ e, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(e.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제 하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, "my-tweet", `${e.id}`));
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (error) => {
    error.preventDefault();
    console.log(error);
    // await doc(dbService,)   //update 문서보고 작성하기
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
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              value={newNweet}
              placeholder="Edit your comment "
              onChange={onChange}
              required
            />
            <input type="submit" value={"update"} onClick={onSubmit} />
          </form>
          <button onClick={toggleEditing}>cancel</button>
        </>
      ) : (
        <div>
          <h4>{e.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>delete nweet</button>
              <button onClick={toggleEditing}>edit nweet</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Nweet;
