import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";
import useInput from "../hooks/use-input";
import { mobile } from "../responsive";
import validator from "validator";
import { useState } from "react";
import {
  useCreateUserCartMutation,
  useRegisterMutation,
} from "../Store/ApiCalls/api-calls";
import { useDispatch } from "react-redux";
import {
  addUserToken,
  currentUser,
} from "../Store/action-creator/user-actions";
import { createNewCart } from "../Store/action-creator/cart-actions";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center no-repeat;
  background-size: cover;
  display: flex;
  /* repeat: no-repeat; */
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 45%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const InputDiv = styled.div`
  display: flex;
  ${mobile({ flexWrap: "wrap" })}
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
  width: 100%;
`;
const Warning = styled.span`
  font-size: 18px;
  margin: 10px 250px;
  color: red;
  width: 100%;
`;
const Button = styled.button`
  width: 50%;
  margin: auto;
  background-color: #000;
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
`;

const useStyles = makeStyles((theme) => ({
  textFiled: {
    margin: "10px 50px 0px 0px",
    width: "275px",
    // maxWidth: "700px",
  },
  btn: {
    width: "30%",
    margin: "20px",
  },
}));

function Register() {
  const classes = useStyles();
  const [registerError, setRegisterError] = useState(null);
  const dispatch = useDispatch();
  const [register, { data, isLoading, error, isError }] = useRegisterMutation();
  const [
    createCart,
    {
      data: cartData,
      isLoading: creatingCart,
      error: cartError,
      isError: isCartError,
    },
  ] = useCreateUserCartMutation();

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => validator.isEmail(value.trim()));

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    reset: resetFirstNameInput,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    reset: resetLastNameInput,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    reset: resetPasswordInput,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const [inputError, setInputError] = useState(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      !enteredFirstNameIsValid ||
      !enteredFirstNameIsValid ||
      !enteredLastNameIsValid ||
      !enteredPasswordIsValid
    ) {
      return setInputError(true);
    } else {
      setInputError(false);
      setRegisterError(null);
      const body = {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        password: enteredPassword,
      };

      try {
        const credentials = await register(body).unwrap();

        dispatch(addUserToken(credentials));

        const newCart = await createCart().unwrap();

        if (newCart) {
          dispatch(createNewCart());
          dispatch(currentUser(credentials));
        }
      } catch (error) {
        if (error.data.keyPattern.email === 1) {
          setRegisterError("email already used.");
        }
      }
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={formSubmitHandler}>
          <InputDiv>
            <TextField
              id="outlined-basic"
              className={classes.textFiled}
              color="secondary"
              label="First Name"
              variant="standard"
              onBlur={firstNameBlurHandler}
              helperText={
                firstNameInputHasError ? "Please enter your first name" : ""
              }
              onChange={firstNameChangedHandler}
              error={firstNameInputHasError}
              value={enteredFirstName}
              type="text"
            />
            <TextField
              id="outlined-basic"
              className={classes.textFiled}
              color="secondary"
              label="Last Name"
              variant="standard"
              onBlur={lastNameBlurHandler}
              helperText={
                lastNameInputHasError ? "Please enter your last name" : ""
              }
              onChange={lastNameChangedHandler}
              error={lastNameInputHasError}
              value={enteredLastName}
              type="text"
            />
          </InputDiv>
          <InputDiv>
            <TextField
              id="outlined-basic"
              className={classes.textFiled}
              color="secondary"
              label="Email"
              variant="standard"
              onBlur={emailBlurHandler}
              helperText={
                emailInputHasError
                  ? "Please enter valid email"
                  : "" || registerError
                  ? registerError
                  : null
              }
              onChange={emailChangedHandler}
              error={emailInputHasError || registerError}
              // error={registerError}
              value={enteredEmail}
              type="email"
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
            />
          </InputDiv>
          <Agreement>
            By creating an account,you are agreeing to our
            <b> terms &#38; conditions.</b>
            <p>
              <Link
                to="/login"
                style={{
                  color: "black",
                  textDecoration: "underline",
                  fontSize: 14,
                }}
              >
                Already have an account, Sign in
              </Link>
            </p>
          </Agreement>
          <Warning>
            {inputError ? (
              <p style={{ margin: "10px auto", color: "red" }}>
                Please enter valid fields
              </p>
            ) : (
              ""
            )}
          </Warning>
          <Button>Register</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Register;
