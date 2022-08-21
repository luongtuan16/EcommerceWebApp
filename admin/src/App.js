import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewProduct from "./pages/newProduct/NewProduct";
import NewUser from "./pages/newUser/NewUser";
import Product from "./pages/product/Product";
import ProductList from "./pages/productList/ProductList";
import User from "./pages/user/User";
import UserList from "./pages/userList/UserList";
import Order from "./pages/order/Order";

function App() {
  const user = useSelector(state => state.user);
  const loggedIn = user && user.curUser && user.curUser.email

  return (
    <Router>
      <Switch>
        <Route path='/login'>
          {loggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route>
          {loggedIn ? '' : <Redirect to="/login" />}
          <Topbar />
          <div className="container">
            <Sidebar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>
            <Route path="/orders">
              <Order />
            </Route>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
