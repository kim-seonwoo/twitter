import { Routes, Route, BrowserRouter } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "routes/Navigation";
import Profile from "routes/Profile";
const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}

      <Routes>
        {isLoggedIn ? (
          <>
            {" "}
            <Route exact path="/" element={<Home userObj={userObj} />} />
            <Route exact path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
