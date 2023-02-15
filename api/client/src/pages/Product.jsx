import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import PageLoader from "../components/Loader/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../Store/action-creator/cart-actions";
import { useGetProductByIdQuery } from "../Store/ApiCalls/api-calls";
import Appbar from "../components/Appbar";
import Menubar from "../components/Menubar";
import { Add, Remove, Star } from "@mui/icons-material";
import useInput from "../hooks/use-input";
import { Button, MenuItem, TextField } from "@mui/material";
import ReviewsDialog from "../components/Reviews/ReviewsDialog";
import ResponsiveDialog from "../components/Dialog/Dialog";
import { makeStyles } from "@mui/styles";
import ProductLoader from "../components/Loader/ProductLoader";

const Container = styled.div`
  position: relative;
  top: 100px;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImageContainer = styled.div`
  text-align: center;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(240, 240, 240);
  border-radius: 8px;
  margin-bottom: 16px;
  height: 80vh;
  padding: 20px 16px;
  flex: 1;
  ${mobile({ padding: "10px" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 500;
`;

const Image = styled.img`
  height: 80vh;
  object-fit: cover;
  width: 80%;
  ${mobile({ height: "50vh" })}
`;

const Description = styled.div`
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(240, 240, 240);
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 20px 16px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 35px;
`;

const OverPrice = styled.span`
  font-weight: 100;
  font-size: 20px;
  color: gray;
  margin-left: 10px;
  text-decoration: line-through;
`;

const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 0;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 20px 16px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(240, 240, 240);
`;
const AmountContainer = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  margin: 10px 0;
  ${mobile({ width: "70%" })}
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Delivery = styled.div`
  width: 25%;
  margin: 10px 0;
  background-color: rgb(255 255 255);
  border-radius: 8px;
  padding-top: 8px;
`;
const Rating = styled.div`
  color: white;
  width: 50px;
  display: flex;
  font-size: 15px;
  align-items: center;
  margin: 5px 0 0 0;
  border-radius: 10px;
  justify-content: center;
  background-color: black;
`;
const Discount = styled.span`
  color: green;
  font-size: 16px;
  margin-left: 10px;
`;

const H6 = styled.h6`
  margin-bottom: 16px;
  color: rgb(51, 51, 51);
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
`;

const SizeDiv = styled.div`
  flex-wrap: wrap;
  display: flex;
`;

const useStyles = makeStyles((theme) => ({
  textFiled: {
    margin: "20px",
    width: "100px",
  },
}));
const Div = styled.div``;

function Product() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { isLoggedIn } = useSelector((state) => state.user);
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  // custom hook
  const {
    value: enteredSize,
    isValid: enteredSizeIsValid,
    hasError: sizeInputHasError,
    valueChangeHandler: sizeChangedHandler,
    inputBlurHandler: sizeBlurHandler,
    reset: resetSizeInput,
  } = useInput((value) => value.trim() !== "");

  // query Hooks

  const {
    data: product,
    error: productError,
    isLoading: productIsLoading,
  } = useGetProductByIdQuery(id, { refetchOnMountOrArgChange: true });

  const addCartHandler = () => {
    if (enteredSize === "") {
      setSelected(true);
    }
    if (enteredSizeIsValid) {
      dispatch(
        addProduct({
          ...product,
          size: enteredSize,
          quantity,
        })
      );
    }
  };

  let content;
  if (productIsLoading) {
    content = <ProductLoader />;
  }
  if (productError) {
    content = (
      <h1 style={{ textAlign: "center", margin: "50px" }}>
        {productError?.originalStatus} Product not found
      </h1>
    );
  }

  if (product) {
    content = (
      <Wrapper>
        <ImageContainer>
          <Image src={product.productImage} />
        </ImageContainer>
        <InfoContainer>
          <Description>
            <Title>{product.title}</Title>
            <div>
              <Price>Rs. {product.price}</Price>
              <OverPrice>
                Rs.
                {Math.round(
                  (product.price * product.discount) / 100 + product.price
                )}
              </OverPrice>
            </div>
            <Rating>
              {product.ratings || 0}

              <Star sx={{ fontSize: 13, marginLeft: 0.5 }} />
            </Rating>
            <Delivery>Free Delivery</Delivery>
          </Description>
          <Description>
            <H6>Select Size</H6>
            <SizeDiv>
              <TextField
                id="outlined-select-state"
                select
                label="Size"
                color="secondary"
                className={classes.textFiled}
                value={enteredSize}
                required={true}
                helperText={selected || sizeInputHasError ? "Select Size." : ""}
                onChange={sizeChangedHandler}
                onBlur={sizeBlurHandler}
                error={selected || sizeInputHasError ? true : false}
              >
                {product?.size?.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </TextField>
            </SizeDiv>
          </Description>

          <Description>
            <H6>Product Details</H6>
            <Div>
              {Object.entries(product.description)?.map(([key, value], i) => (
                <p key={i}>
                  <span style={{ fontWeight: 600 }}>{key}</span>
                  {` : ${value}`}
                </p>
              ))}
            </Div>
          </Description>

          <AddContainer>
            <H6>Add Product To The Cart</H6>

            <AmountContainer>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <Remove />
              </Button>
              <Amount>{quantity}</Amount>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Add />
              </Button>
            </AmountContainer>
            <Button
              variant="contained"
              onClick={addCartHandler}
              size="large"
              color="secondary"
            >
              ADD TO CART
            </Button>
          </AddContainer>
          <Description>
            <H6>Give Review</H6>
            <ResponsiveDialog productId={id} />
            {!isLoggedIn && (
              <p style={{ marginTop: 10 }}>Login to give review</p>
            )}
          </Description>
          <ReviewsDialog productId={id} />
        </InfoContainer>
      </Wrapper>
    );
  }

  return (
    <Container>
      <Appbar />
      <Menubar />
      {content}
      <Newsletter />
      <Footer />
    </Container>
  );
}
export default Product;
