import styled from "styled-components";
import { mobile } from "../responsive";
import validator from "validator";
import useInput from "../hooks/use-input";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../Store/action-creator/cart-actions";
import {
  addUserToken,
  currentUser,
} from "../Store/action-creator/user-actions";
import {
  useLoginMutation,
  useGetUserCartQuery,
} from "../Store/ApiCalls/api-calls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 100%;
  background-color: teal;
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
`;

const useStyles = makeStyles((theme) => ({
  textFiled: {
    "margin-bottom": "10px",
    maxWidth: "700px",
  },
  btn: {
    width: "30%",
    margin: "20px",
  },
}));

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [skip, setSkip] = useState(true);

  const [login, { data: userData, isLoading, error, isError }] =
    useLoginMutation();

  const {
    data: cartData,
    isLoading: cartLoading,
    error: cartError,
  } = useGetUserCartQuery(undefined, { skip: skip });

  useEffect(() => {
    if (cartData) {
      dispatch(updateCart(cartData));
      dispatch(currentUser(userData));
    }
  }, [cartData, userData, dispatch]);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => validator.isEmail(value.trim()));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    reset: resetPasswordInput,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!enteredEmailIsValid || !enteredPasswordIsValid) {
      return;
    }

    // logging and updating userState
    try {
      const loginUser = await login({
        email: enteredEmail,
        password: enteredPassword,
      }).unwrap();

      dispatch(addUserToken(loginUser));

      setSkip(false);
    } catch (error) {}

    resetEmailInput();
    resetPasswordInput();
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={formSubmitHandler}>
          <TextField
            id="outlined-basic"
            className={classes.textFiled}
            color="secondary"
            label="Email"
            variant="standard"
            onBlur={emailBlurHandler}
            helperText={emailInputHasError ? "Please enter valid email" : ""}
            onChange={emailChangedHandler}
            error={emailInputHasError}
            value={enteredEmail}
            type="email"
            required={true}
          />
          <TextField
            id="outlined-basic"
            className={classes.textFiled}
            color="secondary"
            label="Password"
            variant="standard"
            onBlur={passwordBlurHandler}
            helperText={
              passwordInputHasError ? "Please enter valid password." : ""
            }
            onChange={passwordChangedHandler}
            error={passwordInputHasError}
            value={enteredPassword}
            type="password"
            required={true}
          />

          <span
            style={{ fontSize: "12px", marginBottom: "12px", color: "red" }}
          >
            {isError ? error.data : ""}
          </span>

          <Button style={{ backgroundColor: "#000" }}>Log In</Button>

          <Link
            style={{
              margin: "5px 0",
              fontSize: "12px",
              color: "black",
              textDecoration: "none",
            }}
            to=""
          >
            Forgot Password?
          </Link>
          <Link
            style={{
              margin: "5px 0",
              fontSize: "12px",
              color: "black",
              textDecoration: "none",
            }}
            to="/register"
          >
            Create An Account
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login;
