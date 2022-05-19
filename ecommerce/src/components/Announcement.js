import styled from '@emotion/styled'
import React from 'react'

const Wrapper = styled.div`
    background-color: teal;
    color: white;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
`

export default function Announcement() {
  return (
    <Wrapper>Welcome to JackLane Clothing</Wrapper>
  )
}
