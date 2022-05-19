import { Facebook, Instagram, YouTube, LocationOn, Phone, MailOutline } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    display: flex;
    padding: 10px 20px;

`
const Left = styled.div`
    flex: 1;
`
const Logo = styled.h1`
    margin-bottom: 20px;
    ${mobile({
        fontSize: '20px',
      })};
`
const Desc = styled.p`
    margin-bottom: 20px;
`
const SocialWrap = styled.div`
    display: flex;
    align-items: center;
`
const SocialIcon = styled.div`
    margin-right: 10px;
    cursor: pointer;
`

const Center = styled.div`
    flex: 1;
    display: flex;
    margin-left:30px;
    flex-direction: column;
    ${mobile({
        display: 'none'
      })};
`
const Title = styled.h3`
    margin-bottom: 35px;
    ${mobile({
        marginBottom: '20px',
      })};
`
const ListLinks = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;

    flex-wrap: wrap;
    list-style:none;
`

const Link = styled.li`
    width: 40%;
    margin-bottom: 7px;
    cursor: pointer;
    
`

const Right = styled.div`
    flex: 1;
`
const ContactWrap = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`
const ContactItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 7px;
`
const ContactIcon = styled.div`
    margin-right: 10px;
`
export default function Footer() {
    return (
        <Container>
            <Left>
                <Logo>JACKLANE.</Logo>
                <Desc>
                Jack Lane - House Of Design
                </Desc>
                <SocialWrap>
                    <SocialIcon>
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon>
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon>
                        <YouTube />
                    </SocialIcon>
                </SocialWrap>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <ListLinks>
                    <Link>Home</Link>
                    <Link>Man Fashion</Link>
                    <Link>Order Tracking</Link>
                    <Link>Wishlist</Link>
                    <Link>Cart</Link>
                    <Link>Woman Fashion</Link>
                    <Link>My Account</Link>
                    <Link>Terms</Link>
                </ListLinks>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactWrap>
                    <ContactItem>
                        <ContactIcon>
                            <LocationOn/>    
                        </ContactIcon>
                        366 Xã Đàn, P.Nam Đồng, Q.Đống Đa, Hà Nội
                    </ContactItem>
                    <ContactItem>
                        <ContactIcon>
                            <Phone/>    
                        </ContactIcon>
                        0983985989
                    </ContactItem>
                    <ContactItem>
                        <ContactIcon>
                            <MailOutline/>    
                        </ContactIcon>
                        jacklanevn@gmail.com
                    </ContactItem>
                </ContactWrap>
            </Right>
        </Container>
    )
}
