import React, { useState } from "react";
import styled from "@emotion/styled";
import CreateAccountButton from "../atoms/CreateAccountButton";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ffc000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Card = styled.div`
  padding: 36px 15%;
  border-radius: 8px;
  box-shadow: 0 0 25px #c8c8c8;
  background: #fff;
  width: 75%;
  max-width: 1000px;
  height: 75%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Title = styled.p`
  font-size: 36px;
  font-weight: 600;
  color: #525456;
  text-align: center;
  margin-bottom: 48px;
`;
const Input = styled.input`
  border: 1px solid #c8c8c8;
  border-radius: 8px;
  padding: 12px;
  color: #525456;
  font-size: 16px;
  margin-bottom: 12px;
  text-align: center;
`;
const Icon = styled.i`
  color: #537ea5;
  position: absolute;
  top: 16px;
  right: 16px;
`;

const BackIcon = styled.i`
  color: #537ea5;
  position: absolute;
  top: 16px;
  left: 16px;
  cursor: pointer;
`;

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Container>
        <Card>
          <Icon className="material-icons">lock</Icon>
          <BackIcon
            className="material-icons"
            onClick={() => (window.location.href = "/login")}
          >
            arrow_back_ios
          </BackIcon>
          <Title>Create Account</Title>
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <CreateAccountButton email={email} password={password} />
        </Card>
      </Container>
    </div>
  );
}

export default CreateAccount;
