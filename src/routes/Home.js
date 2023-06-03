import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { dbService, storageService } from "fbase";
import Nweet from "Components/Nweet";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  width: 300px;
`;

const FileInput = styled.input`
  margin-bottom: 0.5rem;
`;

const SubmitButton = styled.input`
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  width: 300px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const AttachmentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const AttachmentImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 0.5rem;
`;

const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(dbService, "my-tweet"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      }
    );

    return () => unsubscribe();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";

    if (attachment) {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await addDoc(collection(dbService, "my-tweet"), nweetObj);
    setNweet("");
    setAttachment(null);
  };

  const onChange = (event) => {
    const { value } = event.target;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setAttachment(result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          value={nweet}
          onChange={onChange}
          type="text"
          maxLength={120}
          placeholder="댓글을 입력하세요"
        />
        <FileInput type="file" accept="image/*" onChange={onFileChange} />
        <SubmitButton type="submit" value="Upload" />
        {attachment && (
          <AttachmentContainer>
            <AttachmentImage src={attachment} alt="attachment" />
            <ClearButton onClick={onClearAttachment}>Clear</ClearButton>
          </AttachmentContainer>
        )}
      </Form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            e={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
