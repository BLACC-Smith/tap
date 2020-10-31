import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { createUser } from "../../firebase/functions";

const Button = styled.div`
  padding: 16px;
  background: #537ea5;
  border-radius: 6px;
  margin-top: 24px;
  font-size: 18px;
  color: #fff;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-align: center;
  cursor: pointer;
`;
const Error = styled.div`
  padding: 16px;
  visibility: ${({ accountExists }) => (accountExists ? "visible" : "hidden")};
  opacity: ${({ accountExists }) => (accountExists ? "1" : "0")};
  transition: visibility 0s, opacity 0.5s linear;
  background: #537ea5;
  border-radius: 6px;
  margin-top: 24px;
  font-size: 18px;
  color: #fff;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-align: center;
  cursor: pointer;
`;

function CreateAccountButton(props) {
  const [accountExists, setAccountExists] = useState(false);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    createUser(props.email, props.password, setError);
  }, [clicked]);

  return (
    <>
      <Button
        onClick={() => {
          setClicked(!clicked);
          error !== null
            ? setAccountExists(true)
            : (window.location.href = "/login"); // ****Update to homescreen when created****
        }}
      >
        Create Account
      </Button>
      <Error
        accountExists={accountExists}
        onClick={() => (window.location.href = "/login")}
      >
        Account Already Exists. Login Here
      </Error>
    </>
  );
}

export default CreateAccountButton;
