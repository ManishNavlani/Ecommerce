import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { orderSuccess } from "../Store/action-creator/cart-actions";
import {
  useCreateOrderMutation,
  useUpdateUserCartMutation,
} from "../Store/ApiCalls/api-calls";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function Success() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { userAddress, currentUser, paymentIntent } = useSelector(
    (state) => state.user
  );

  const [createOrder] = useCreateOrderMutation();
  const [updateCart] = useUpdateUserCartMutation();

  const body = {
    userOrderId: currentUser._id,
    products: cart.products,
    amount: cart.total,
    address: userAddress,
    paymentDone: true,
    paymentIntent: paymentIntent,
  };

  useEffect(() => {
    (async () => {
      try {
        const sendOrderTODb = await createOrder(body).unwrap();
        const updateCartTODb = await updateCart(cart).unwrap();

        dispatch(orderSuccess());

        setTimeout(() => {
          history.replace("/userorders");
        }, 2000);
      } catch (error) {}
    })();
  }, []);
  return <Container>Redirecting to Your Orders...</Container>;
}

export default Success;
