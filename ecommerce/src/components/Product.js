import { FavoriteBorderOutlined, Search, ShoppingCartOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../responsive'

const IconWrap = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  transition: all 0.5s ease;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
  margin: 5px 3px;
  position: relative;
  width: 24vw;
  background-color: white;
  transition: all 1s ease;
  &:hover ${IconWrap}{
    opacity: 1;
  }
  ${mobile({
  width: '100vw'
})};
`
const Image = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`

const Icon = styled.div`
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 8px; 
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.3);
    background-color: lightgrey;
  }
`

export default function Product({ data }) {
  return (
    <Container>
      <Image src={data.img} alt="" />
      <IconWrap>
          <Link to={`/product/${data._id}`}>
        <Icon>
            <Search />
        </Icon>
          </Link>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </IconWrap>
    </Container>
  )
}
