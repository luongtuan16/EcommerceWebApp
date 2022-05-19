import { Send } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0px;
  background-color: #fcf5f5;
  padding: 50px;
`
const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 70px;
  letter-spacing: 4px;
  ${mobile({
    fontSize: '50px'
  })};
`
const Desc = styled.p`
  margin-bottom: 30px;
  font-size: 40px;
  ${mobile({
    fontSize: '20px',
    textAlign: 'center'
  })};
`
const Wrapper = styled.div`
  width: 70%;
  height: 48px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightgray;
`
const EmailInput = styled.input`
  flex: 8;
  border: none;
  padding-left: 20px;
  font-size: 20px;
  outline: none;
  ${mobile({
    width: '100%',
    paddingLeft: '10px'
  })};
`
const SendBtn = styled.button`
  flex: 1;
  height: 100%;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`

export default function Newsletter() {
  return (
    <Container>
        <Title>Newsletter</Title>
        <Desc>
          Get timely updates from your favorite products
        </Desc>
        <Wrapper>
            <EmailInput placeholder='Your Email...'/>
            <SendBtn>
                <Send/>
            </SendBtn>
        </Wrapper>
    </Container>
  )
}
