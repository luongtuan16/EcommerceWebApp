import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { publicRequest } from '../requestMethods'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginError, loginStart, loginSuccess } from '../redux/userSlice'
import { useSelect } from '@mui/base'
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
const Wrapper = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding:0px 15px;
  z-index: 2;
  ${mobile({
  width: '70%'
})};
`
const Title = styled.h1`
  margin: 20px 0px;
  ${mobile({
  textAlign: 'center',
})};
`
const InfoInput = styled.input`
  padding: 5px 10px;
  margin-bottom: 10px;
  font-size: 20px;
`
const PasswordWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0px',
  width: '100%'
})};
`
const PasswordInput = styled.input`
  flex:1;
  padding: 5px 10px;
  font-size: 20px;
  margin-bottom: 10px;
  margin-right: ${props => props.left ? '15px' : '0px'};
  ${mobile({
  marginRight: '0px',
  width: '91%'
})};
`
const Policy = styled.span`
  margin-bottom: 10px;
`
const SignUpBtn = styled.button`
  border: none;
  padding: 7px 0px;
  color: white;
  background-color: teal;
  font-size: 20px;
  width: 30%;
  margin: auto;
  margin-bottom: 20px;
  cursor: pointer;
`
export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errLog, setErrLog] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.user.isFetching);

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password || !name || !password2){
      setErrLog('Please fill all informations!');
      return;
    }
    if (password !== password2)
      setErrLog('Wrong password');
    else {
      setErrLog('');
      dispatch(loginStart());

      publicRequest.post('/auth/register', {
        userName: name,
        email,
        password
      }).then(res => {
        dispatch(loginSuccess({}));
        navigate('/login');
      }).catch(e => {
        setErrLog('Register fail');
        console.log(e);
      });
    }
    console.log(name, email, password, password2);
  }


  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <InfoInput
          placeholder='Your name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <InfoInput
          placeholder='Email address'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <PasswordWrap>
          <PasswordInput
            left type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <PasswordInput
            type='password'
            placeholder='Confirm password'
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        </PasswordWrap>
        <span style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>
          {errLog}</span>
        <Policy>By clicking Sign Up, you agree to our
          <b>Terms</b>, <b>Data Policy</b> and <b>Cookie Policy</b>. You may receive SMS notifications from us and can opt out at any time.</Policy>
        <SignUpBtn disabled={isFetching} onClick={handleSubmit}>Sign Up</SignUpBtn>
      </Wrapper>
    </Container>
  )
}
