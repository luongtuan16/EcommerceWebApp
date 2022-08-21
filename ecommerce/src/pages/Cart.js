import React, { useEffect, useState } from 'react'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import styled from 'styled-components'
import Newsletter from '../components/Newsletter'
import { mobile } from '../responsive'
import { getCart, updateCart } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../components/CartItem'
import { useNavigate } from 'react-router-dom'
import { decrease, setAmount } from '../redux/cartSlice'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { userRequest } from '../requestMethods'
const Container = styled.div`
    
`
const Wrapper = styled.div`
    padding: 0px 15px;
    margin-bottom: 20px;
`
const Title = styled.h1`
    margin: 15px 0px;
    text-align: center;
`
const TopWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

`
const TopBtn = styled.button`
    border: ${props => props.type === 'white' ? '2px solid black' : 'none'};
    padding: 10px;
    background-color: ${props => props.type === 'white' ? 'white' : 'black'};
    color: ${props => props.type === 'white' ? 'black' : 'white'};
    font-weight: bold;
    cursor: pointer;
    margin-bottom : ${props => props.type === 'bottom' ? '20px' : ''};
    width: ${props => props.type === 'bottom' ? '100%' : ''}
`
const TopText = styled.span`
    cursor: pointer;
    text-decoration: underline;
    font-weight: bold;
`
const BottomWrap = styled.div`
    display: flex;
    ${mobile({
    flexDirection: 'column'
})};
`
const ProductWrap = styled.div`
    flex: 3;
    
`
const Summary = styled.div`
    flex: 1;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    padding: 0px 10px;
    .bold {
        fontSize: 20px;
        font-size: 20px;
        font-weight: bold;
    }
`
const SummaryItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`
const Price = styled.span`

`

export default function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [ship, setShip] = useState(20);
    const [discount, setDiscount] = useState(20);
    const [openDialog, setOpenDialog] = useState(false);
    const [ordering, setOrdering] = useState(false);
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.curUser._id);
    const token = useSelector(state => state.user.curUser.token);
    //console.log('cart page re-render');

    useEffect(() => {
        setTotal(cart.reduce((total, item) =>
            total + Number(item.price) * Number(item.quantity),
            0));
    }, [cart])

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        } else {
            const res = []
            getCart(userId, res, token)
                .then(() => {
                    setCart(res);
                })
                .catch(err => console.log(err));
        }
    }, [userId, navigate, dispatch]);

    const update = (index, quantity) => {
        const newCart = [...cart];
        newCart[index].quantity = quantity;
        const products = newCart.map(item => ({
            productId: item.id,
            color: item.color,
            size: item.size,
            quantity: item.quantity
        }));

        updateCart(userId, products, token)
            .then(() => setCart(newCart))
            .catch(err => console.log(err));
    }

    const removeProductFromCart = (index) => {
        cart.splice(index, 1);
        const newCart = [...cart];
        const products = newCart.map(item => ({
            productId: item.id,
            color: item.color,
            size: item.size,
            quantity: item.quantity
        }));
        updateCart(userId, products, token)
            .then(() => {
                setCart(newCart);
                dispatch(decrease());
            })
            .catch(err => console.log(err));
    }

    const handleClickCheckout = () => {
        setOpenDialog(true);
    }
    const handleCheckout = async () => {
        if (total > 0 && address){
            //console.log(cart);
            setOrdering(true);
            const orderProducts = cart.map(item => {
                return {
                    productId: item.id,
                    quantity: item.quantity
                }
            })
            const res = await userRequest(token).post('/order', {
                userId,
                products: orderProducts,
                amount: total,
                address,
                status: "pending"
            });
            if (res.status === 200) {
                setOpenDialog(false);
                setOrdering(false);
                await userRequest(token).delete(`/cart/${userId}`);
                setCart([]);
                dispatch(setAmount(0));
                alert("Order Successful!");
            }else {
                console.log(res);
                alert("Order failed");
                setOrdering(false);
            }
        }
    }
    return (
        <Container>
            <NavBar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <TopWrap>
                    <TopBtn type='white'>CONTINUE SHOPPING</TopBtn>
                    <TopText>Shopping Bag (2)</TopText>
                    <TopText>Your Wishlist (0)</TopText>
                    <TopBtn onClick={handleClickCheckout}>CHECKOUT NOW</TopBtn>
                </TopWrap>
                <BottomWrap>
                    <ProductWrap>
                        {cart.map((item, index) =>
                            <CartItem
                                key={index}
                                product={item}
                                update={update}
                                index={index}
                                remove={removeProductFromCart}
                            />
                        )}
                    </ProductWrap>
                    <Summary>
                        <Title>ORDER SUMMARY</Title>
                        <SummaryItem>
                            <Price>Subtotal</Price>
                            <Price>
                                {`$ ${total}`}
                            </Price>
                        </SummaryItem>
                        <SummaryItem>
                            <Price>Estimated Shipping</Price>
                            <Price>{`$ ${ship}`}</Price>
                        </SummaryItem>
                        <SummaryItem>
                            <Price>Discount</Price>
                            <Price>{`$ ${discount}`}</Price>
                        </SummaryItem>
                        <SummaryItem className='bold'>
                            <Price>Total</Price>
                            <Price>{`$ ${total + ship - discount}`}</Price>
                        </SummaryItem>
                        <TopBtn onClick={handleClickCheckout} type='bottom'>CHECKOUT NOW</TopBtn>
                    </Summary>
                </BottomWrap>
                <Dialog
                    fullWidth={true}
                    open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>CHECKOUT</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your order: $ {total}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            margin="dense"
                            label="Your Address"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button disabled={ordering} onClick={handleCheckout}>Checkout</Button>
                    </DialogActions>
                </Dialog>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}
