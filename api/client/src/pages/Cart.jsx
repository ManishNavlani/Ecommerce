import styled from "styled-components";
import Appbar from "../components/Appbar";
import Menubar from "../components/Menubar";
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
} from "../Store/action-creator/cart-actions";
import Summary from "../components/Summary";
import CheckoutStepper from "../components/Stepper";
import { Button } from "@mui/material";
import { useEffect } from "react";

const Container = styled.div`
  position: relative;
  top: 120px;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: "20px 0" })}
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  color: #${(props) => props.type === "filled" && "fff"};
  background-color: ${(props) =>
    props.type === "filled" ? "#000" : "transparent"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  cursor: pointer;
  margin: 0 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 2px;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ padding: "20px 0" })};
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${mobile({ justifyContent: "start" })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 60%;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", width: "50%" })}
`;

const ProductAmount = styled.div`
  height: 30px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  ${mobile({ margin: "20px 0", width: "100%" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

function Cart() {
  const history = useHistory();
  const { products, cartQuantity, total } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let content;
  if (products.length === 0) {
    content = (
      <Wrapper
        style={{
          padding: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>Your Cart is empty.Please Add Products to your Cart.</h1>
        <Link to="/products" style={{ color: "black", textDecoration: "none" }}>
          <Button
            style={{ width: "150px", margin: "30px" }}
            variant="contained"
            color="secondary"
          >
            Shop Now
          </Button>
        </Link>
      </Wrapper>
    );
  }

  if (products.length > 0) {
    content = (
      <>
        <Wrapper>
          <CheckoutStepper step={0} />
          <Title>Your Cart</Title>
          <Top>
            <TopButton onClick={() => history.push("/products")}>
              Continue Shopping
            </TopButton>
            <TopTexts>
              <TopButton
                type="filled"
                onClick={() => history.push("/userorders")}
              >
                Your Orders
              </TopButton>
            </TopTexts>
          </Top>
          <Bottom>
            <Info>
              {products.map((product, index) => (
                <Product key={index}>
                  <ProductDetail>
                    <Image src={product.productImage} />
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
                    </Details>
                  </ProductDetail>
                  <PriceDetails>
                    <ProductAmountContainer>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          dispatch(increaseQuantity({ id: product._id }))
                        }
                        color="secondary"
                        size="small"
                      >
                        <Add />
                      </Button>
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          dispatch(decreaseQuantity({ id: product._id }))
                        }
                        color="secondary"
                        size="small"
                      >
                        <Remove />
                      </Button>
                    </ProductAmountContainer>
                    <ProductPrice>
                      Rs. {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetails>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary total={total} />
          </Bottom>
        </Wrapper>
      </>
    );
  }
  return (
    <Container>
      <Appbar />
      <Menubar />
      {content}
      <Footer />
    </Container>
  );
}

export default Cart;
