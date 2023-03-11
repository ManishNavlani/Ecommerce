import { Button, MenuItem, TextField } from "@mui/material";
import styled from "styled-components";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { makeStyles } from "@mui/styles";
import useInput from "../hooks/use-input";
import { states } from "../indiaStatesArr";
import { mobile } from "../responsive";
import { useHistory } from "react-router-dom";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import Appbar from "../components/Appbar";
import Menubar from "../components/Menubar";
import {
  addPaymentIntent,
  addUserAddress,
} from "../Store/action-creator/user-actions";
import { useCheckOutMutation } from "../Store/ApiCalls/api-calls";
import CheckoutStepper from "../components/Stepper";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: "center";
  position: relative;
  top: 120px;
`;

const Wrapper = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const H1 = styled.h1`
  margin: 10px 0;
`;

const useStyles = makeStyles((theme) => ({
  textFiled: {
    margin: "20px",
    maxWidth: "700px",
  },
  btn: {
    width: "30%",
    margin: "20px",
  },
  inputStyle: {
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      display: "none",
    },
  },
}));
function CheckoutForm() {
  const cart = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [checkOut] = useCheckOutMutation();

  const classes = useStyles();
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredNumber,
    isValid: enteredNumberIsValid,
    hasError: numberInputHasError,
    valueChangeHandler: numberChangedHandler,
    inputBlurHandler: numberBlurHandler,
    reset: resetNumberInput,
  } = useInput((value) => validator.isMobilePhone(value, ["en-IN"]));

  const {
    value: enteredPinCode,
    isValid: enteredPinCodeIsValid,
    hasError: pinCodeInputHasError,
    valueChangeHandler: pinCodeChangedHandler,
    inputBlurHandler: pinCodeBlurHandler,
    reset: resetPinCodeInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLocality,
    isValid: enteredLocalityIsValid,
    hasError: localityInputHasError,
    valueChangeHandler: localityChangedHandler,
    inputBlurHandler: localityBlurHandler,
    reset: resetLocalityInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangedHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddressInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredState,
    isValid: enteredStateIsValid,
    hasError: stateInputHasError,
    valueChangeHandler: stateChangedHandler,
    inputBlurHandler: stateBlurHandler,
    reset: resetStateInput,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredLandmark,
    valueChangeHandler: landmarkChangedHandler,
    reset: resetLandmarkInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAltPhone,
    hasError: altPhoneInputHasError,
    valueChangeHandler: altPhoneChangedHandler,
    reset: resetAltPhoneInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredNumberIsValid &&
    enteredPinCodeIsValid &&
    enteredLocalityIsValid &&
    enteredAddressIsValid &&
    enteredCityIsValid &&
    enteredStateIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    const address = {
      name: enteredName,
      number: enteredNumber,
      pincode: enteredPinCode,
      locality: enteredLocality,
      address: enteredAddress,
      city: enteredCity,
      state: enteredState,
      altNumber: enteredAltPhone,
      landmark: enteredLandmark,
    };

    dispatch(addUserAddress(address));

    const data = {
      ...address,
      products: cart.products,
      customer: currentUser,
    };

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    resetNameInput();
    resetNumberInput();
    resetPinCodeInput();
    resetLocalityInput();
    resetAddressInput();
    resetCityInput();
    resetStateInput();
    resetLandmarkInput();
    resetAltPhoneInput();

    try {
      const payment = await checkOut(data).unwrap();

      dispatch(addPaymentIntent(payment.paymentIntent));
      window.location.href = payment.url;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Appbar />
      <Menubar />
      <Container>
        <CheckoutStepper step={1} />

        <H1>Shipping Address :</H1>
        <Wrapper>
          <Form action="" onSubmit={formSubmissionHandler}>
            <TextField
              id="outlined-basic"
              className={classes.textFiled}
              color="secondary"
              label="Name"
              variant="standard"
              onBlur={nameBlurHandler}
              helperText={
                nameInputHasError ? "Please fill out this field." : ""
              }
              onChange={nameChangedHandler}
              error={nameInputHasError}
              value={enteredName}
              type="text"
              required={true}
            />
            <TextField
              id="outlined-basic"
              className={`${classes.textFiled}`}
              color="secondary"
              label="10-digit mobile number"
              variant="standard"
              InputProps={{ classes: { input: classes.inputStyle } }}
              onBlur={numberBlurHandler}
              helperText={
                numberInputHasError ? "Please valid phone number." : ""
              }
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
              onChange={numberChangedHandler}
              error={numberInputHasError}
              value={enteredNumber}
              required={true}
              type="number"
            />
            <TextField
              id="outlined-basic"
              className={`${classes.textFiled} ${classes.number}`}
              color="secondary"
              label="Pincode"
              variant="standard"
              InputProps={{ classes: { input: classes.inputStyle } }}
              onBlur={pinCodeBlurHandler}
              helperText={
                pinCodeInputHasError ? "Please fill out this field." : ""
              }
              type="number"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6);
              }}
              onChange={pinCodeChangedHandler}
              error={pinCodeInputHasError}
              value={enteredPinCode}
              required={true}
            />
            <TextField
              id="outlined-basic"
              className={classes.textFiled}
              color="secondary"
              label="Locality"
              variant="standard"
              onBlur={localityBlurHandler}
              helperText={
                localityInputHasError ? "Please fill out this field." : ""
              }
              onChange={localityChangedHandler}
              error={localityInputHasError}
              value={enteredLocality}
              type="text"
              required={true}
            />

            <TextField
              id="outlined-basic"
              className={classes.textFiled}
              color="secondary"
              multiline
              minRows={4}
              label="Address"
              variant="standard"
              onBlur={addressBlurHandler}
              helperText={
                addressInputHasError ? "Please fill out this field." : ""
              }
              onChange={addressChangedHandler}
              error={addressInputHasError}
              value={enteredAddress}
              type="text"
              required={true}
            />

            <TextField
              id="outlined-basic"
              className={classes.textFiled}
              color="secondary"
              label="City/District/Town"
              variant="standard"
              onBlur={cityBlurHandler}
              helperText={
                cityInputHasError ? "Please fill out this field." : ""
              }
              onChange={cityChangedHandler}
              error={cityInputHasError}
              value={enteredCity}
              type="text"
              required={true}
            />

            <TextField
              id="outlined-select-state"
              className={classes.textFiled}
              select
              label="State"
              color="secondary"
              value={enteredState}
              required={true}
              helperText={
                stateInputHasError ? "Please fill out this field." : ""
              }
              onChange={stateChangedHandler}
              onBlur={stateBlurHandler}
              error={stateInputHasError}
            >
              {states.map((option) => (
                <MenuItem key={option.abbreviation} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="outlined-basic"
              className={classes.textFiled}
              color="secondary"
              label="Landmark (Optional)"
              variant="standard"
              onChange={landmarkChangedHandler}
              value={enteredLandmark}
              type="text"
            />

            <TextField
              id="outlined-basic"
              className={`${classes.textFiled}`}
              color="secondary"
              label="Alternate Phone (Optional)"
              variant="standard"
              InputProps={{ classes: { input: classes.inputStyle } }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
              onChange={altPhoneChangedHandler}
              error={altPhoneInputHasError}
              value={enteredAltPhone}
            />
            <Button
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.btn}
              disabled={!formIsValid}
            >
              Pay Now
            </Button>
          </Form>
        </Wrapper>
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
}

export default CheckoutForm;
