import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import Products from '../components/Products'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Wrapper = styled.div`
    margin: 20px 15px;
`
const Title = styled.h1`
    margin-bottom: 20px;
`
const Wrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    ${mobile({
    flexDirection: 'column',
    alignItems: 'flex-start'
})};
`

const FilterWrap = styled.div`
    display: flex;
    align-items: center;
    ${mobile({
    marginBottom: '10px'
})};
`
const FilterContent = styled.h2`
    
`
const FilterSelect = styled.select`
    margin-left: 20px;
    padding: 10px;
`
const FilterOption = styled.option`
    
`
export default function ProductList() {
    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState('');

    const handleSelect = e => setFilter({
        ...filter,
        [e.target.name]: e.target.value
    })
    return (
        <div>
            <NavBar />
            <Announcement />
            <Wrapper>
                <Title>LIST PRODUCTS</Title>
                <Wrap>
                    <FilterWrap>
                        <FilterContent>Filter Products</FilterContent>
                        <FilterSelect
                            onChange={handleSelect}
                            name='size'
                        >
                            <FilterOption disabled>Size</FilterOption>
                            <FilterOption>All</FilterOption>
                            <FilterOption>S</FilterOption>
                            <FilterOption>M</FilterOption>
                            <FilterOption>L</FilterOption>
                            <FilterOption>XL</FilterOption>
                        </FilterSelect>
                        <FilterSelect
                            
                            onChange={handleSelect}
                            name='color'
                        >
                            <FilterOption disabled>Color</FilterOption>
                            <FilterOption>All</FilterOption>
                            <FilterOption>black</FilterOption>
                            <FilterOption>white</FilterOption>
                            <FilterOption>yellow</FilterOption>
                            <FilterOption>green</FilterOption>
                            <FilterOption>red</FilterOption>
                        </FilterSelect>
                    </FilterWrap>
                    <FilterWrap>
                        <FilterContent>Sort Products</FilterContent>
                        <FilterSelect        
                            onChange={e => setSort(e.target.value)}
                        >
                            <FilterOption value='newest'>Newest</FilterOption>
                            <FilterOption value='asc'>Price (asc)</FilterOption>
                            <FilterOption value='dsc'>Price (dsc)</FilterOption>
                        </FilterSelect>
                    </FilterWrap>
                </Wrap>
            </Wrapper>
            <Products filter={filter} sort={sort} />
            <Newsletter />
            <Footer />
        </div>
    )
}
