import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAmount, setAmount } from '../redux/cartSlice';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom'
import { getCart } from '../redux/apiCalls';
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const Language = styled.span`
  cursor: pointer;
  ${mobile({
  display: 'none'
})};
`

const SearchContainer = styled.form`
  display: flex;
  border: 0.5px solid lightgrey;
  padding: 5px;
  margin-left:25px;
  border-radius: 5px;
  
`
const SearchInput = styled.input`
  border: none;
  outline: none;
  font-weight: bold;
  ${mobile({
  width: '50px'
})};
`
const SubmitBtn = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`
const Center = styled.div`
  flex: 1;
  text-align: center;
`
const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  ${mobile({
  fontSize: '15px',
})};
`
const Right = styled.div`
  flex: 1;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({
  justifyContent: 'space-between'
})};
`
const MenuItem = styled.span`
  margin-right: 20px;   
  cursor: pointer;
  display: flex;
  align-items: center;
  ${mobile({
  fontSize: '14px',
  marginRight: '0px'
})};
`

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 30px;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
`;

const Logout = styled.span`
  font-weight: 600;
`;

export default function NavBar() {
  //console.log('re-render navbar');
  const user = useSelector(state => state.user.curUser);
  const cartAmount = useSelector(selectAmount);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleClick = () => {
    setToggle(!toggle);
  }

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
  }

  const handleClickCart = () => {
    if (!user.email)
      navigate('/login');
    else
      navigate(`/cart`);
  }

  useEffect(() => {
    // console.log('update cart amount')
    if (user._id) {
      // console.log('fetch cart')
      const cart = [];
      getCart(user._id, cart)
        .then(() => dispatch(setAmount(cart.length)))
        .catch(err => console.log(err));
    } else
      dispatch(setAmount(0));
  }, [user._id, dispatch]);

  const handleSearch = e => {
    e.preventDefault();
    if (search)
      navigate(`/product-list/search/${search}`);
  }
  return (
    <Container>
      <Left>
        <Language>EN</Language>
        <SearchContainer>
          <SearchInput 
            value={search}
            onChange = {e => setSearch(e.target.value)} 
          />
          <SubmitBtn onClick={handleSearch}>
            <SearchIcon style={{ cursor: "pointer" }} />
          </SubmitBtn>
        </SearchContainer>
      </Left>
      <Center>
        <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
          <Logo>JACKLANE.</Logo>
        </Link>
      </Center>
      <Right>
        {!user.email && <Link to='/register'>
          <MenuItem>Register</MenuItem>
        </Link>}
        {!user.email && <Link to='/login'>
          <MenuItem>Sign In</MenuItem>
        </Link>}
        <MenuItem onClick={handleClickCart}>

          <Badge badgeContent={cartAmount} color="primary">
            <ShoppingCartOutlined />
          </Badge>

        </MenuItem>
        {user.avatar && <MenuItem style={{ flexDirection: 'column', position: 'relative' }}>
          <Avatar onClick={handleClick} src={user.avatar} alt="" />
          {toggle && <Dropdown>
            <Logout onClick={handleLogout}>Logout</Logout>
          </Dropdown>}
        </MenuItem>}

      </Right>
    </Container>
  )
}
