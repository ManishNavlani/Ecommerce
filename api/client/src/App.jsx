// npm packages
import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//Routes
const Home = lazy(() => import("./pages/Home"));
const ProductList = lazy(() => import("./pages/ProductList"));
const Product = lazy(() => import("./pages/Product"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Cancel = lazy(() => import("./pages/Cancel"));
const Success = lazy(() => import("./pages/Success"));
const Cart = lazy(() => import("./pages/Cart"));
const CheckoutForm = lazy(() => import("./pages/CheckoutForm"));
const YourOrders = lazy(() => import("./pages/YourOrders"));
const SearchProductsList = lazy(() => import("./pages/SearchProductsList"));
const NotFoundPage = lazy(() => import("./pages/404Page"));

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <Router>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <p>Loading...</p>
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/products/:category">
            <ProductList />
          </Route>
          <Route path="/products" exact>
            <ProductList />
          </Route>
          <Route path="/search">
            <SearchProductsList />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/register">
            {isLoggedIn ? <Redirect to="/" exact /> : <Register />}
          </Route>
          <Route path="/login">
            {isLoggedIn ? <Redirect to="/" exact /> : <Login />}
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>

          <Route path="/success">
            {isLoggedIn ? <Success /> : <Redirect to="/" exact />}
          </Route>
          <Route path="/cancel">
            {isLoggedIn ? <Cancel /> : <Redirect to="/" exact />}
          </Route>
          <Route path="/checkout">
            {isLoggedIn ? <CheckoutForm /> : <Redirect to="/" exact />}
          </Route>
          <Route path="/userorders">
            <YourOrders />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
