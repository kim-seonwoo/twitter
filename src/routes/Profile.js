import { authService } from "fbase";
import { getAuth } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgrey;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const ProfileInfo = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 1rem;
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
`;

function Profile() {
  const navigate = useNavigate();

  const onLogOut = () => {
    authService.signOut();
    navigate("/");
  };

  const authUser = getAuth();
  const user = authUser.currentUser;
  const displayName = user.displayName;
  const email = user.email;
  const userPhotoUrl = user.photoURL;

  return (
    <ProfileContainer>
      <LogoutButton onClick={onLogOut}>Logout</LogoutButton>
      <ProfileImage src={userPhotoUrl} alt="Profile" />
      <ProfileInfo>{displayName}님 반갑습니다!</ProfileInfo>
      <ProfileInfo>이메일 정보: {email}</ProfileInfo>
    </ProfileContainer>
  );
}

export default Profile;
