import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import {
  useGetUserOrdersQuery,
  useUpdateUserCartMutation,
} from "../Store/ApiCalls/api-calls";
import moment from "moment";
import Appbar from "../components/Appbar";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import Menubar from "../components/Menubar";
import { useSelector } from "react-redux";
import ProductLoader from "../components/Loader/ProductLoader";
const Container = styled.div`
  padding: 20px;
  position: relative;
  top: 120px;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const Hr = styled.hr`
  background-color: #aca3a3;
  border: none;
  height: 1.5px;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex: 1;
  ${mobile({ flexDirection: "row", flex: 1 })};
`;

const Image = styled.img`
  width: 100px;
  margin-right: 70px;
  ${mobile({ width: "75px", marginRight: "55px" })};
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({ padding: 0 })};
`;

const OrderDiv = styled.div`
  padding: 20px;
  border: 1px solid #000;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  ${mobile({ padding: 10, fontSize: 10 })}
`;

const InfoDiv = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  align-items: center;
  ${mobile({ padding: "2px 10px", fontSize: 10 })}
`;
const ProductImageDiv = styled.div`
  flex: 1;
`;
const ProductDetailsInner = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;

  ${mobile({
    justifyContent: "space-between",
    width: "120px",
    marginLeft: "120px",
  })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ fontSize: "10px", padding: 0, fontWeight: 500 })}
`;

const ProductQuantity = styled.div`
  font-size: 24px;
  flex: 1;
  ${mobile({ fontSize: "10px", padding: 0 })}
`;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  top: 100px;
  ${mobile({ padding: "10px" })}
`;
const OrderDetails = styled.div``;

function YourOrders() {
  const cart = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);
  const {
    data = [],
    error,
    isError,
    isLoading,
  } = useGetUserOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !isLoggedIn,
  });

  const [updateCart] = useUpdateUserCartMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLoggedIn) {
      (async () => {
        const updateCartTODb = await updateCart(cart).unwrap();
      })();
    }
  }, []);

  if (isLoading) {
    return (
      <>
        <Appbar />
        <Menubar />
        <Wrapper style={{}}>
          <ProductLoader />
        </Wrapper>
        <Newsletter />
        <Footer />
      </>
    );
  }

  let content;
  if (data.length === 0) {
    return (content = (
      <>
        <Appbar />
        <Menubar />
        <Wrapper style={{}}>
          {isLoggedIn ? (
            <h1>You have not placed any orders.Please Order Something</h1>
          ) : (
            <h1>Please Sign in to see your orders.</h1>
          )}

          <Link
            to="/products"
            style={{ color: "black", textDecoration: "none" }}
          >
            <Button
              style={{ width: "150px", margin: "30px" }}
              variant="contained"
              color="secondary"
            >
              Shop Now
            </Button>
          </Link>
        </Wrapper>
        <Newsletter />
        <Footer />
      </>
    ));
  }

  if (data.length > 0) {
    return (content = (
      <>
        <Appbar />
        <Menubar />
        <Container>
          <h1>Your Orders :</h1>
          {data?.map((item, index) => (
            <OrderDiv key={index}>
              {item.products.map((product, index) => (
                <div key={index}>
                  <Product key={`${product._id + new Date().getTime()}`}>
                    <ProductDetail>
                      <ProductImageDiv>
                        <Image src={product.productImage} />
                      </ProductImageDiv>
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product._id}
                        </ProductId>
                        <ProductSize>
                          <b>Size:</b> {product.size}
                        </ProductSize>
                        <ProductSize>
                          <b>Each:</b> {product.price} Rs.
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <ProductDetailsInner>
                      <ProductQuantity>
                        {product.quantity} <b>X</b>
                      </ProductQuantity>
                      <ProductPrice>
                        {product.price * product.quantity} Rs.
                      </ProductPrice>
                    </ProductDetailsInner>
                  </Product>
                  <Hr />
                </div>
              ))}
              <OrderDetails>
                <InfoDiv>
                  <h4>Total Paid by You : </h4> {item.amount} Rs.
                </InfoDiv>
                <InfoDiv>
                  <h4>Expected Delivery : </h4>
                  {moment(item.createdAt).add(7, "days").format("DD/MM/YYYY")}
                </InfoDiv>
                <InfoDiv>
                  <h4>Delivery Status : </h4>
                  {item.status}
                </InfoDiv>
              </OrderDetails>
            </OrderDiv>
          ))}
        </Container>
        <Newsletter />
        <Footer />
      </>
    ));
  }

  return <>{content}</>;
}

export default YourOrders;
