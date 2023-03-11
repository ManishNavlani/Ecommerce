import { makeStyles } from "@mui/styles";
import { alpha, AppBar, IconButton, InputBase, Toolbar } from "@mui/material";
import { Search } from "@mui/icons-material";
import { menuLinks } from "./Appbar";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },

  search: {
    display: "none",
    marginLeft: "10px",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    color: "black",
    border: "1px solid black",

    [theme.breakpoints.between("xs", "sm")]: {
      width: "100%",
      display: "flex",
    },
  },

  input: {
    marginLeft: theme.spacing(1),
    width: "90%",
    color: "black",
  },
  menu: {
    width: "100%",
    paddingRight: "0px",
    paddingLeft: "0px",
    marginRight: "auto",
    marginLeft: "auto",
    [theme.breakpoints.between("xs", "sm")]: {
      display: "none",
    },
  },
  menuInnerDiv: {
    position: "relative",
    height: "52px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgb(255, 255, 255)",
    pointerEvents: "all",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
  },

  menuItem: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    margin: "0 10px",
    color: "#000",
    "&:hover": {
      cursor: "pointer",
      border: "1px solid #000",
      padding: "3px",
      transition: "all 0.5s",
    },
  },
  appBar: {
    top: "60px",
    boxShadow: "none",
    [theme.breakpoints.down("md")]: {
      top: "50px",
    },
  },
}));

function NavBar() {
  const styles = useStyles();
  const history = useHistory();
  const [searchTxt, setSearchTxt] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchTxt !== "") {
      history.push(`/search?q=${searchTxt}&page=1`);
    }
    if (searchTxt === "") {
      history.push(`/products`);
    }
  };
  return (
    <AppBar position="fixed" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <form className={styles.search} onSubmit={searchHandler}>
          <InputBase
            placeholder="Try T-shirts, Shirts "
            className={styles.input}
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

        <div className={styles.menu}>
          <div className={styles.menuInnerDiv}>
            {menuLinks.map((item, index) => (
              <div
                key={index}
                className={styles.menuItem}
                onClick={() => history.push(`${item.link}`)}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
