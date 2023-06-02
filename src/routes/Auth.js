import React, { useState } from "react";
import { authService } from "fbase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;

  div {
    list-style-type: none;
    display: flex;
    justify-content: left;
    padding: 20;
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
    transition: color 0.3s;
    margin: 20px;
    font-size: 20px;
  }
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
  width: 200px;
`;

const SubmitButton = styled.input`
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  width: 200px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ToggleLink = styled.span`
  color: #111111;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const SocialButton = styled.button`
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  width: 200px;
  background-color: ${(props) => props.color};
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 0.5rem;
`;

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  let provider = null;

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    console.log(provider);
    signInWithPopup(authService, provider);
  };

  return (
    <Container>
      <div>김선우와 대화방</div>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <SubmitButton
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
      <ToggleLink onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </ToggleLink>
      <div>
        <SocialButton name="google" onClick={onSocialClick} color="#333333">
          Continue with Google
        </SocialButton>
        <SocialButton name="github" onClick={onSocialClick} color="#333333">
          Continue with Github
        </SocialButton>
      </div>
    </Container>
  );
};

export default Auth;
