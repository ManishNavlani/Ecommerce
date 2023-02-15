import { useEffect, useState } from "react";
import { Close, Person } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import {
  Box,
  SwipeableDrawer,
  Button,
  List,
  Divider,
  Typography,
  Rating,
} from "@mui/material";
import { mobile } from "../../responsive";

import styled from "styled-components";
import { useGetProductReviewsQuery } from "../../Store/ApiCalls/api-calls";

const Description = styled.div`
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(240, 240, 240);
  border-radius: 8px;
  margin-bottom: 50px;
  padding: 20px 16px;
`;

const H4 = styled.h4`
  ${mobile({ fontSize: "14px" })}
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  ${mobile({ padding: " 0 0 0 0px" })}
`;

const CardReviewHeader = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  ${mobile({ padding: "0" })}
`;

const CardReview = styled.div`
  padding: 0 0 10px 10px;
  ${mobile({ padding: "0" })}
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const useStyles = makeStyles((theme) => ({
  box: {
    width: "650px",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "100%",
    },
  },
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px ",
  },

  cardRatings: {
    color: "#000",
    padding: "10px",
    [theme.breakpoints.between("xs", "sm")]: {
      // padding: "0",
      fontSize: "14px",
    },
  },
  personIcon: {
    border: "1px solid black",
    borderRadius: "50%",
    marginRight: "5px",
  },
  drawer: {
    [theme.breakpoints.between("xs", "sm")]: {
      width: "100px",
    },
  },
}));
const H6 = styled.h6`
  margin-bottom: 16px;
  color: rgb(51, 51, 51);
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
`;
const DrawerReviewDiv = styled.div`
  padding: 10px 15px;
`;
export default function SwipeableTemporaryDrawer({ productId }) {
  const classes = useStyles();
  const [state, setState] = useState(false);

  const { data, isLoading, isError, error } = useGetProductReviewsQuery(
    productId,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const toggleDrawer = (open) => () => {
    setState(open);
  };

  const reviewList = (item, index) => {
    return (
      <Card key={index}>
        <CardContent>
          <CardReviewHeader>
            <Person className={classes.personIcon} />
            <H4>{item.userName}</H4>
          </CardReviewHeader>
          <Rating
            name="read-only"
            value={item.ratings}
            readOnly
            className={classes.cardRatings}
          />
        </CardContent>
        <CardReview>
          <p>{item.review}</p>
        </CardReview>
        <Divider />
      </Card>
    );
  };

  const list = () => (
    <Box className={classes.box} role="presentation">
      <List className={classes.reviewHeader}>
        <Typography variant="h5" component="h4">
          Product Reviews
        </Typography>
        <Button onClick={toggleDrawer(false)} color="secondary">
          <Close />
        </Button>
      </List>
      <Divider />
      <DrawerReviewDiv>
        {data?.map((item, index) => reviewList(item, index))}
      </DrawerReviewDiv>
    </Box>
  );

  return (
    <div>
      <Description>
        <H6>Product reviews</H6>
        {data?.length > 5
          ? data?.slice(0, 5).map((item, index) => reviewList(item, index))
          : data?.map((item, index) => reviewList(item, index))}
        {data?.length > 5 ? (
          <Button
            onClick={toggleDrawer(true)}
            color="secondary"
            variant="outlined"
          >
            View All Reviews
          </Button>
        ) : null}
        {data?.length === 0 ? <H4>Be the first reviewer.</H4> : null}
      </Description>
      <SwipeableDrawer
        anchor="right"
        className={classes.drawer}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
