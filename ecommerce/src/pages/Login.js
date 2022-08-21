
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { publicRequest } from '../requestMethods'
import { mobile } from '../responsive'
import { loginStart, loginSuccess, loginError } from '../redux/userSlice'
import { HomeOutlined } from '@mui/icons-material'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: 
    linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),
    url(https://mcdn.nhanh.vn/store/25618/bn/sb_1605548009_687.jpg);  
`
const Wrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding:0px 15px;
  z-index: 2;
  ${mobile({
  width: '60%'
})};
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Top = styled.div`
  position: relative;
`
const Title = styled.div`
  font-weight: 1000;
  font-size: 30px;
  margin: 20px 0px;
  text-align: center;
`
const InfoInput = styled.input`
  padding: 5px 10px;
  margin-bottom: 10px;
  font-size: 20px;
`

const LoginBtn = styled.button`
  border: none;
  padding: 7px 0px;
  color: white;
  background-color: teal;
  font-size: 20px;
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
  cursor: pointer;
`
const ForgotPass = styled.p`
    margin-bottom: 20px;
    text-align: center;
    cursor: pointer;
`
const CreatABtn = styled.button`
    margin: auto;
    font-size: 20px;
    width: 70%;
    border: none;
    color: white;
    background-color: #42b72a;
    cursor: pointer;
    margin-bottom: 20px;
    margin-top: 20px;
    text-align: center;
    padding: 7px 0px;
`

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.user.isFetching);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginStart());
    console.log({ email, password });

    publicRequest.post('/auth/login', {
      email,
      password
    }).then(res => {
      dispatch(loginSuccess(res.data));
      //console.log(res);
      navigate('/');

    }).catch(error => {
      //console.log(error);
      dispatch(loginError());
      setErr('Something went wrong.')
    })

  }

  return (
    <Container>
      <Wrapper>
        <Form>
          <Top>
          <Link to='/' 
          style={{textDecoration: 'none', position: 'absolute', top: '20px'}}
          >
            <HomeOutlined fontSize='large'/>
          </Link>
          <Title>LOGIN</Title>
          </Top>
          <InfoInput
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <InfoInput
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <LoginBtn
            onClick={handleSubmit}
            disabled={isFetching}
          >Login</LoginBtn>
          <span style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>
            {err}</span>
        </Form>
        <ForgotPass>Forgoten password?</ForgotPass>
        <hr />
        <CreatABtn onClick={() => navigate('/register')}>Create New Account</CreatABtn>
      </Wrapper>
    </Container>
  )
}
