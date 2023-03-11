import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useUpdateUserCartMutation } from "../Store/ApiCalls/api-calls";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  margin: auto;
  text-align: center;
  height: 80vh;
`;

function Cancel() {
  const cart = useSelector((state) => state.cart);

  const [updateCart] = useUpdateUserCartMutation();
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const updateCartTODb = await updateCart(cart).unwrap();
    })();

    setTimeout(() => {
      history.replace("/cart");
    }, 4000);
  }, []);

  return (
    <Container>
      <div>
        <h1>
          Payment Transaction has not been processed successfully.Please Try
          Again.Redirecting to your cart...
        </h1>
      </div>
    </Container>
  );
}

export default Cancel;
