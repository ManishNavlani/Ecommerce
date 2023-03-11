import { useHistory } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Star } from "@mui/icons-material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(5),
    width: 300,
    cursor: "pointer",
    height: 420,
    [theme.breakpoints.down("md")]: {
      opacity: 1,
    },
  },
  media: {
    [theme.breakpoints.up("md")]: {
      height: 300,
      "object-fit": "cover",
    },
    [theme.breakpoints.down("md")]: {
      height: 300,
      "object-fit": "cover",
    },
  },
  content: {
    color: "gray",
    fontSize: "18px",
  },
  price: {
    color: "black",
  },
  discount: {
    color: "green",
    marginLeft: 10,
    fontSize: 16,
  },
  checked: {
    color: "gray",
    marginLeft: 10,
    fontSize: 14,
    textDecoration: "line-through",
  },
  rating: {
    color: "white",
    fontSize: 15,
    width: 50,
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
}));
function ProductItem({ product }) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      onClick={() => {
        history.push(`/product/${product._id}`);
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          image={product.productImage}
          alt="img"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            className={classes.content}
            component="div"
          >
            {product.title}
          </Typography>
          <Typography
            gutterBottom
            variant="p"
            className={classes.rating}
            component="div"
          >
            {product.ratings}
            <Star sx={{ fontSize: 13, marginLeft: 0.5 }} />
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            className={classes.price}
            component="span"
          >
            Rs. {product.price}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            className={classes.checked}
            component="span"
          >
            Rs.{" "}
            {Math.round(
              (product.price * product.discount) / 100 + product.price
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductItem;
