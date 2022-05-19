import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import { publicRequest } from '../requestMethods'
import { useParams } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

export default function Products({ filter = {}, sort }) {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFP] = useState([]);

  const cat = useParams().category;
  const keyword = useParams().keyword;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [])
  useEffect(() => {
    let apiUrl = ''
    if (cat)  apiUrl = `/product?category=${cat}`
    else if (keyword) apiUrl = `/product/search?keyword=${keyword}`
    else apiUrl = '/product';
    publicRequest.get(apiUrl)
      .then(res => {
        setProducts(res.data);
        setFP(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [cat, keyword])

  useEffect(() => {
    let tempArr = [...products];
    //filter color
    if (filter.color && filter.color !== "All"){
      tempArr = tempArr.filter(product =>
        product.color.find(color => color === filter.color));
      //console.log(tempArr);
      }
    //filter size
    if (filter.size && filter.size !== "All")
      tempArr = tempArr.filter(product =>
        product.size.find(size => size === filter.size));
    
    //sort products
    if (sort === 'asc')
      tempArr.sort((cur, pre) => cur.price - pre.price);
    else if (sort === 'dsc')
      tempArr.sort((cur, pre) => pre.price - cur.price);

    setFP(tempArr);
  }, [sort, filter.color, filter.size, products])

  return (
    <Container>
      {filteredProducts.map((item) =>
        <Product key={item._id} data={item} />
      )}
    </Container>
  )
}
