import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";

const steps = ["Checkout", "Address", "Pay"];

const useStyles = makeStyles((theme) => ({
  stepper: {
    backgroundColor: "black",
    width: "100%",
    padding: "10px 0",
    margin: "10px 0",
  },
}));

export default function CheckoutStepper({ step }) {
  const classes = useStyles();

  return (
    <Box sx={{}} className={classes.stepper}>
      <Stepper activeStep={step}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <span style={{ color: "white" }}>{label}</span>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
