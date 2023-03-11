import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: "50px",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  skeletonImg: {
    width: 600,
    height: "80vh",
    [theme.breakpoints.down("md")]: {
      width: 300,
      height: "50vh",
    },
  },
  skeletonDes: {
    width: 400,
    height: 300,
    marginTop: 1,
    [theme.breakpoints.down("md")]: {
      width: 200,
      height: 350,
    },
  },
}));

function ProductLoader() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.box}>
        <div>
          <Skeleton
            animation="wave"
            className={classes.skeletonImg}
            variant="rectangular"
          />
        </div>
        <div>
          <Skeleton
            animation="wave"
            className={classes.skeletonDes}
            variant="rectangular"
          ></Skeleton>
          <Skeleton
            animation="wave"
            className={classes.skeletonDes}
            variant="rectangular"
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            className={classes.skeletonDes}
          />
        </div>
      </Box>
    </>
  );
}
export default ProductLoader;
