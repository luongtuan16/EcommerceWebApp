import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

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
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
