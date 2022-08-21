import React from 'react'
import styled from 'styled-components'
import CategoryItem from './CategoryItem'
import { categories } from '../data'
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
            {categories.map((item, index) =>
                <CategoryItem item = {item} key = {index}/>
            )}   
        </Container>
    )
}
