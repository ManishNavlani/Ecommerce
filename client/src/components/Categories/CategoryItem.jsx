import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(5),
    opacity: 0.8,
    width: 350,
    height: 400,

    "&:hover": {
      opacity: 1,
    },

    [theme.breakpoints.down("md")]: {
      opacity: 0.9,
      width: 250,
      height: 300,
    },
    position: "relative",
  },
  media: {
    height: 400,
    "object-fit": "cover",
    [theme.breakpoints.down("md")]: {
      height: 300,
    },
  },
  content: {
    top: 330,
    left: 0,
    color: "white",
    position: "absolute",
    [theme.breakpoints.down("md")]: {
      top: 210,
    },
  },
  title: {
    fontWeight: 700,
    fontSize: 30,
  },
}));

function CategoryItem({ item }) {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Card
      className={classes.card}
      onClick={() => {
        history.push(`/products/${item.cat}?page=1`);
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          image={item.img}
          alt="green iguana"
        />
        <CardContent className={classes.content}>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            className={classes.title}
          >
            {item.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CategoryItem;
