import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";

function App() {

  const user = useSelector(state => state.user.curUser.email);
  //console.log(!user);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={user ? <Navigate to='/'/> : <Login/>}/>
        <Route path='/register' element={user ? <Navigate to='/'/> :<Register/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product-list/search/:keyword' element={<ProductList />} />
        <Route path='/product-list/:category' element={<ProductList />} />
        <Route path='/product-list' element={<ProductList />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
