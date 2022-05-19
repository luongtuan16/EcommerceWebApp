import React from 'react'
import styled from 'styled-components'
import { Add, Remove } from '@mui/icons-material'
import { Link } from 'react-router-dom'
const Container = styled.div`
    display: flex;
    border-bottom: 1px solid lightgray;
    margin: 20px 0px;
`
const ImageContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
`
const ProductInfo = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: space-around;
`
const SingleInfo = styled.span`

`
const ProductRight = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`
const ProductAmount = styled.div`
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
const ProductPrice = styled.span`
    font-size: 20px;
    font-weight: bold;
`
export default function CartItem({ product, update, index, remove }) {

    const handleClick = (num) => {
        if (product.quantity + num > 0)
            update(index, product.quantity + num);
        else {
            remove(index);
        }
    }

    return (
        <Container>
            <ImageContainer>
            <Link to={`/product/${product.id}`}>
                <Image src={product.img} alt="" />
            </Link>
            </ImageContainer>
            <ProductInfo>
                <SingleInfo>
                    <b>Product: </b> {product.name}
                </SingleInfo>
                <SingleInfo>
                    <b>ID: </b>{product.id}
                </SingleInfo>
                <SingleInfo>
                    <b>Color: </b>{product.color}
                </SingleInfo>
                <SingleInfo>
                    <b>Size: </b>{product.size}
                </SingleInfo>
            </ProductInfo>
            <ProductRight>
                <ProductAmount>
                    <Icon >
                        <Remove onClick={() => handleClick(-1)} />
                    </Icon>
                    <Quantity>{product.quantity}</Quantity>
                    <Icon>
                        <Add onClick={() => handleClick(1)} />
                    </Icon>
                </ProductAmount>
                <ProductPrice>{Number(product.price) * Number(product.quantity)}</ProductPrice>
            </ProductRight>
        </Container>
    )
}
