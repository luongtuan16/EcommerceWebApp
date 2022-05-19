import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 15px 5px;
    height: 50vh;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Content = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
`
const Title = styled.h1`
    color: white;
    margin-bottom: 15px;
    text-align: center;
`
const ShopBtn = styled.button`
    background-color: white;
    border: none;
    font-weight: 600;
    cursor: pointer;
    padding: 10px;
    color: grey;
`
export default function CategoryItem({ item }) {
    return (
        <Container>
            <Image src={item.img} />
            <Content>
                <Title>{item.title}</Title>
                <Link to={`/product-list/${item.category}`}>
                    <ShopBtn>SHOP NOW</ShopBtn>
                </Link>
            </Content>
        </Container>
    )
}
