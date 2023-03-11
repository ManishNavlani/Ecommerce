import React from "react";
import classes from "./PageLoader.module.css";
function PageLoader() {
  return (
    <div className={classes.body}>
      <main>
        <div className={classes.preloader}>
          <div className={classes["preloader__square"]}></div>
          <div className={classes["preloader__square"]}></div>
          <div className={classes["preloader__square"]}></div>
          <div className={classes["preloader__square"]}></div>
        </div>
        <div className={classes.status}>
          Loading<span className={classes["status__dot"]}>.</span>
          <span className={classes["status__dot"]}>.</span>
          <span className={classes["status__dot"]}>.</span>
        </div>
      </main>
    </div>
    // <p></p>
  );
}

export default PageLoader;
