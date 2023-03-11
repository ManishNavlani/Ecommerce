import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;
  padding: 10px;
  width: 100%;
`;

function Summary({ total }) {
  const { isLoggedIn } = useSelector((state) => state.user);
  const history = useHistory();
  return (
    <Container>
      <SummaryTitle>ORDER SUMMARY</SummaryTitle>
      <SummaryItem>
        <SummaryItemText>SubTotal</SummaryItemText>
        <SummaryItemPrice>Rs. {total}</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText>Estimated Shipping</SummaryItemText>
        <SummaryItemPrice>Rs. 70</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText> - Shipping Discount</SummaryItemText>
        <SummaryItemPrice>Rs. 70</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem type="total">
        <SummaryItemText>Total</SummaryItemText>
        <SummaryItemPrice>Rs. {total}</SummaryItemPrice>
      </SummaryItem>
      <Button
        onClick={() => {
          isLoggedIn ? history.push("/checkout") : history.push("/login");
        }}
      >
        Check Out
      </Button>
    </Container>
  );
}

export default Summary;
