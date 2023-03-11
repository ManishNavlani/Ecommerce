import React, { useState } from "react";
//icons
import {
  Logout,
  PersonOutlineOutlined,
  ShoppingBagOutlined,
  ShoppingCart,
  Menu,
  Search,
} from "@mui/icons-material";
//mui components
import {
  List,
  InputBase,
  alpha,
  AppBar,
  Divider,
  ListItem,
  MenuItem,
  Box,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  SwipeableDrawer,
  Container,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../Store/action-creator/user-actions";
import {
  useLogoutMutation,
  useUpdateUserCartMutation,
} from "../Store/ApiCalls/api-calls";
import { resetCart } from "../Store/action-creator/cart-actions";

export const menuLinks = [
  { text: "Women", link: "/products/women?page=1" },
  { text: "Men", link: "/products/men?page=1" },
  { text: "Boys", link: "/products/boys?page=1" },
  { text: "Girls", link: "/products/girls?page=1" },
  { text: "Men Footwear", link: "/products/men-footwear?page=1" },
  { text: "Women Footwear", link: "/products/women-footwear?page=1" },
];

const useStyles = makeStyles((theme) => ({
  logo: {
    mr: 2,
    [theme.breakpoints.between("xs", "sm")]: {
      display: "none",
    },
  },
  hamBurger: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.between("xs", "sm")]: {
      display: "block",
    },
  },
  search: {
    marginLeft: "10px",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    color: "black",
    border: "1px solid black",

    display: "flex",
    marginRight: "10px",
    width: "40%",
    [theme.breakpoints.between("xs", "sm")]: {
      display: "none",
    },
  },

  input: {
    marginLeft: theme.spacing(1),
    width: "90%",
    color: "black",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  login: {
    fontSize: "15px",
    // padding: 0,

    // margin: "0 4px 0 0",
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: "10px",
      padding: 0,
      margin: "0 5px 0 0",
    },
  },
  loginDiv: {
    width: "10%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "10%",
      display: "flex",
      paddingRight: "15%",
      marginLeft: "-20%",
    },
  },
  loggedInDiv: {
    width: "30%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      display: "none",
    },
  },
  mobLogo: {
    fontSize: "24px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutBox: {
    position: "absolute",
    bottom: "0px",
  },
  contact: {
    fontSize: "14px",
    position: "absolute",
    bottom: "45px",
  },
  appbar: {
    boxShadow: "none",
  },
  logoutTxt: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

const ResponsiveAppBar = () => {
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const badge = useSelector((state) => state.cart.cartQuantity);
  const [updateCart] = useUpdateUserCartMutation();
  const [logoutUser] = useLogoutMutation();

  const styles = useStyles();
  const [state, setState] = React.useState(false);

  const [searchTxt, setSearchTxt] = useState("");
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchTxt !== "") {
      history.push(`/search?q=${searchTxt}&page=1`);
    }
    if (searchTxt === "") {
      history.push(`/products`);
    }
  };

  const list = () => (
    <Box
      sx={{ width: 200 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <ListItem className={styles.mobLogo}>Manish</ListItem>
        </Link>
        <Divider />
        <ListItem>
          <PersonOutlineOutlined sx={{ marginRight: "5px" }} />
          {`Hello ${
            currentUser?.firstName ? currentUser?.firstName : "Sign in"
          },`}
        </ListItem>
        <Divider />

        <ListItem button onClick={() => history.push("/userorders")}>
          <ShoppingBagOutlined sx={{ marginRight: "5px" }} /> Your Orders
        </ListItem>
        <Divider />

        <ListItem>Categories</ListItem>

        {menuLinks.map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={() => history.push(`${item.link}`)}
          >
            {item.text}
          </ListItem>
        ))}
      </List>
      <Divider />
      <div>
        <ListItem className={styles.contact}>
          Contact us on : navlanimanish77@gmail.com
        </ListItem>
        <Divider />
      </div>
      {isLoggedIn ? (
        <ListItem
          button
          className={styles.logoutBox}
          onClick={async () => {
            await updateCart(cart).unwrap();
            await logoutUser().unwrap();
            dispatch(resetCart());
            dispatch(logout());
          }}
        >
          <Logout sx={{ marginRight: "5px" }} />{" "}
          <Typography variant="span" noWrap component="span">
            Log out
          </Typography>
        </ListItem>
      ) : null}
    </Box>
  );

  return (
    <AppBar position="fixed" className={styles.appbar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className={styles.toolbar}>
          <Typography
            variant="h4"
            noWrap
            component="div"
            className={styles.logo}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Manish
            </Link>
          </Typography>

          <form className={styles.search} onSubmit={searchHandler}>
            <InputBase
              placeholder="Try T-shirts, Shirts "
              className={styles.input}
              value={searchTxt}
              onChange={(e) => setSearchTxt(e.target.value)}
            />
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              type="submit"
              onClick={searchHandler}
            >
              <Search sx={{ marginRight: "20px", cursor: "pointer" }} />
            </IconButton>
          </form>

          <Box className={styles.hamBurger}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <Menu />
            </IconButton>
            <SwipeableDrawer
              anchor="left"
              open={state}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              {list()}
            </SwipeableDrawer>
          </Box>
          <Typography
            variant="h6"
            noWrap
            className={styles.hamBurger}
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Manish
            </Link>
          </Typography>
          {!isLoggedIn ? (
            <div className={styles.loginDiv}>
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <MenuItem className={styles.login}>Sign up</MenuItem>
              </Link>

              <Link
                to="/login"
                style={{ color: "black", textDecoration: "none" }}
              >
                <MenuItem className={styles.login}>Sign in</MenuItem>
              </Link>
            </div>
          ) : (
            <div className={styles.loggedInDiv}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItem>
                  <PersonOutlineOutlined sx={{ marginRight: "5px" }} />
                  {`Hello ${
                    currentUser?.firstName ? currentUser?.firstName : "Sign in"
                  },`}
                </ListItem>
              </div>
              <div>
                <ListItem button onClick={() => history.push("/userorders")}>
                  Your Orders
                </ListItem>
              </div>
              <div>
                <ListItem
                  button
                  onClick={async () => {
                    dispatch(resetCart());
                    await updateCart(cart).unwrap();
                    await logoutUser().unwrap();
                    dispatch(logout());
                  }}
                >
                  <Logout sx={{ marginRight: "5px" }} />{" "}
                  <Typography
                    variant="span"
                    noWrap
                    component="span"
                    className={styles.logoutTxt}
                  >
                    Logout
                  </Typography>
                </ListItem>
              </div>
            </div>
          )}
          <Box sx={{ flexGrow: 0, cursor: "pointer" }}>
            <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
              <Badge badgeContent={badge} color="secondary">
                <ShoppingCart color="secondary" />
              </Badge>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
