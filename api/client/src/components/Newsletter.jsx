import React from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fff0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  top: 120px;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "60px" })}
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;
const Input = styled.input`
  border: none;
  padding-left: 20px;
  flex: 8;
  outline: none;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #000;
  color: white;
  cursor: pointer;
`;
function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>
        Get timely updates from your favourite products.
      </Description>
      <InputContainer>
        <Input placeholder="Your email "></Input>
        <Button>
          <SendRoundedIcon />
        </Button>
      </InputContainer>
    </Container>
  );
}

export default Newsletter;
