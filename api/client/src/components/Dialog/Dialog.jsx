import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Rating,
  Typography,
  Button,
  TextField,
} from "@mui/material";

import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import {
  useGetUserReviewQuery,
  usePostReviewMutation,
  useUpdateUserReviewMutation,
} from "../../Store/ApiCalls/api-calls";

const useStyles = makeStyles((theme) => ({
  ratings: {
    color: "#000",
  },
  text: {
    width: 400,
    [theme.breakpoints.between("xs", "sm")]: {
      width: 250,
    },
  },
}));

export default function ResponsiveDialog({ productId }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { currentUser, isLoggedIn } = useSelector((state) => state.user);

  // getting user review of product

  const { data, isLoading, isError, error } = useGetUserReviewQuery(productId, {
    refetchOnMountOrArgChange: true,
    skip: !isLoggedIn,
  });

  const [postReview] = usePostReviewMutation();

  const [updateReview] = useUpdateUserReviewMutation();

  const [review, setReview] = useState(data ? data.review : "");
  const [value, setValue] = useState(data ? data.ratings : 0);

  useEffect(() => {
    if (data) {
      setReview(data.review);
      setValue(data.ratings);
    }
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const body = {
      productId,
      userReviewId: currentUser._id,
      ratings: value,
      review,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
    };
    const updateReviewBody = {
      ratings: value,
      review,
    };
    try {
      if (!data) {
        const postedReview = await postReview(body).unwrap();
        setReview(postedReview.review);
        setValue(postedReview.ratings);
      } else {
        const updatedReview = await updateReview({
          updateReviewBody,
          productId,
        }).unwrap();
        setReview(updatedReview.review);
        setValue(updatedReview.ratings);
      }
    } catch (error) {}

    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        color="secondary"
        disabled={!isLoggedIn}
      >
        Give Ratings
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Give Ratings</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Rating
              name="simple-controlled"
              value={value}
              // color="secondary"
              className={classes.ratings}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
          <TextField
            multiline
            color="secondary"
            className={classes.text}
            margin="dense"
            id="name"
            label="Review"
            type="text"
            fullWidth
            value={review}
            variant="standard"
            onChange={(e) => setReview(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={formSubmitHandler} autoFocus color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
