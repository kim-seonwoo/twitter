import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #f2f2f2;
  padding: 1rem;

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
  }

  ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    padding: 0;
  }

  li {
    margin: 0 1rem;
  }

  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: #007bff;
    }
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <div>김선우와 대화방</div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
      </ul>
    </Nav>
  );
};

export default Navigation;
