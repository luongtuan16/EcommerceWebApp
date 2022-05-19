import React from 'react'
import styled from 'styled-components'
import CategoryItem from './CategoryItem'
import { data } from '../data'
import { mobile } from '../responsive'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    ${mobile({
        flexDirection: 'column'
      })};
`

export default function Categories() {
    return (
        <Container>
            {data.map((item, index) =>
                <CategoryItem item = {item} key = {index}/>
            )}   
        </Container>
    )
}
