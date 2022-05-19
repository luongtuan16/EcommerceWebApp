import styled from 'styled-components'
import React, { useState } from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
import { data } from '../data'
import { mobile } from '../responsive'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    overflow: hidden;
    ${mobile({
        display: 'none',
      })};
`
const Arrow = styled.div`
    background-color: rgb(248, 231, 231);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    margin: 10px;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.direct === 'left' && '10px'};
    right: ${props => props.direct === 'right' && '10px'};
    margin: auto;
    z-index: 2;
`
const WrapSildes = styled.div`
    display: flex;
    height: 100%;
    transform: translateX(-${props => props.index*100}vw);
    transition: all 1s ease;
`
const Slide = styled.div`
    display: flex;
    justify-content: center;    
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.bg}
`
const ImageContainer = styled.div`
    flex: 2;
    height: 100%;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`
const Title = styled.h1`
    font-size: 70px;
    
`
const Desc = styled.p`
    font-size: 40px;
    margin: 30px 0px;
    letter-spacing: 3px;
    font-weight: 500;
`
const ShowBtn = styled.button`
    font-size: 20px;
    padding: 10px;
    background-color: transparent;
    cursor: pointer;
`
export default function Slider() {
    const [slideIndex, setSlideIndex] = useState(0)

    const handleClick = direction => {
        if (direction === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : data.length - 1)
        } else if (direction === 'right')
            setSlideIndex(slideIndex < data.length - 1 ? slideIndex + 1 : 0)
    }

    return (
        <Container>
            <Arrow direct='left' onClick={() => handleClick('left')}>
                <ArrowLeftOutlined />
            </Arrow>
            <Arrow direct='right' onClick={() => handleClick('right')}>
                <ArrowRightOutlined />
            </Arrow>
            <WrapSildes index = {slideIndex}>
                {data.map((item, index) => 
                <Slide key = {index} bg = {item.bg || 'white'}>
                    <ImageContainer>
                        <Image src={item.img} />
                    </ImageContainer>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Desc>{item.desc}</Desc>
                        <ShowBtn>Show now</ShowBtn>
                    </InfoContainer>
                </Slide>)}
            </WrapSildes>

        </Container>
    )
}
