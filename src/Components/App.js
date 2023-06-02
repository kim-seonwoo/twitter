import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";
import Auth from "routes/Auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        //유저 객체 정보를 저장함
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
      // init이 false라면 router를 숨김
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
