import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import styled from 'styled-components'
import { Add, Remove } from '@mui/icons-material'
import { mobile } from '../responsive'
import { useParams } from 'react-router-dom'
import { publicRequest } from '../requestMethods'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/apiCalls'
import { increase } from '../redux/cartSlice'
import { keyframes } from 'styled-components'

const Wrapper = styled.div`
    margin: 20px 30px;
    display: flex;
    justify-content: space-between;
    ${mobile({
    flexDirection: 'column'
})};
`

const ImgWrap = styled.div`
    flex: 1;
`
const Image = styled.img`
   width: 100%;
    
`
const WrapContent = styled.div`
    flex: 1;
    margin-left: 40px; 
    display: flex;
    flex-direction: column;
    ${mobile({
    margin: 'auto'
})};
`

const Title = styled.h1`
    margin-bottom: 20px;
    font-size: 40px;
`

const Desc = styled.span`
    margin-bottom: 20px;
`
const Price = styled.h1`
    margin-bottom: 20px;
`
const Wrap = styled.div`
    display: flex;
    width: 60%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    ${mobile({
    width: '100%'
})};
`

const FilterWrap = styled.div`
    display: flex;
    align-items: center;
    
`
const FilterContent = styled.h2`
    
`
const FilterSelect = styled.select`
    margin-left: 20px;
    padding: 10px;
`
const FilterOption = styled.option`
    
`
const BtnWrap = styled.div`
    margin-left: 30px;
    position: relative;
`
const AddBtn = styled.button`
    background-color: transparent;
    border: 2px solid teal;
    padding: 10px;
    cursor: pointer;
`
const AddToCart = keyframes`
    100% {
        transform: translate(160px, -300px);
    }
`
const BtnNum = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #1976d2;
    position: absolute;
    top: -10px;
    right: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    &.action{
        animation: ${AddToCart};
        animation-duration: .5s;
    }
`
const QuantityWrap = styled.div`
    display: flex;
    align-items: center;
`
const Quantity = styled.span`
    border: 1px solid teal;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20%;
    margin: 0px 3px;
`
const Icon = styled.div`
    cursor: pointer;
`
export default function Product() {

    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState({})
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [action, setAction] = useState('');

    const user = useSelector(state => state.user.curUser);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [])

    useEffect(() => {
        publicRequest.get(`/product/${params.id}`)
            .then(res => {
                setProduct(res.data);
                setColor(res.data.color[0]);
                setSize(res.data.size[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }, [params]);

    const handleAddtoCart = () => {
        if (size && color && quantity) {
            try {
                addToCart(user._id, {
                    _id: product._id,
                    color,
                    size,
                    quantity
                });
                setAction("action");
                setTimeout(() => {
                    dispatch(increase());
                    setAction("");
                }, 500);
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <NavBar />
            <Announcement />
            <Wrapper>
                <ImgWrap>
                    <Image src={product.img} alt="" />
                </ImgWrap>
                <WrapContent>
                    <Title>{product.name}</Title>
                    <Desc>
                        {product.desc}
                    </Desc>
                    <Price>$ {product.price}</Price>
                    <Wrap>
                        <FilterWrap>
                            <FilterContent>Color</FilterContent>
                            <FilterSelect
                                onChange={e => setColor(e.target.value)}
                            >
                                {product.color && product.color.map(color =>
                                    <FilterOption key={color}>{color}</FilterOption>
                                )}

                            </FilterSelect>
                        </FilterWrap>
                        <FilterWrap>
                            <FilterContent>Size</FilterContent>
                            <FilterSelect
                                onChange={e => setSize(e.target.value)}
                            >
                                {product.size && product.size.map(size =>
                                    <FilterOption key={size}>{size}</FilterOption>
                                )}
                            </FilterSelect>

                        </FilterWrap>
                    </Wrap>
                    <Wrap>
                        <QuantityWrap>
                            <Icon onClick={() => {
                                if (quantity > 1)
                                    setQuantity(quantity - 1)
                            }}>
                                <Remove />
                            </Icon>
                            <Quantity>{quantity}</Quantity>
                            <Icon onClick={() => setQuantity(quantity + 1)}>
                                <Add />
                            </Icon>
                        </QuantityWrap>
                        <BtnWrap>
                            <AddBtn
                                onClick={handleAddtoCart}
                            >ADD TO CART</AddBtn>
                            <BtnNum className={action}>1</BtnNum>
                        </BtnWrap>
                    </Wrap>
                </WrapContent>
            </Wrapper>
            <Newsletter />
            <Footer />
        </div>
    )
}
