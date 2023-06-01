import { authService } from "fbase";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const onLogOut = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <div>
      <button onClick={onLogOut}>logout</button>
    </div>
  );
}

export default Profile;
