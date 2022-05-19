
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { publicRequest } from '../../requestMethods'
import { loginError, loginStart, loginSuccess } from '../../redux/userSlice'

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
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
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
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

`
const ForgotPass = styled.p`
    margin-bottom: 20px;
    text-align: center;
    cursor: pointer;
`
// const CreatABtn = styled.button`
//     margin: auto;
//     font-size: 20px;
//     width: 70%;
//     border: none;
//     color: white;
//     background-color: #42b72a;
//     cursor: pointer;
//     margin-bottom: 20px;
//     margin-top: 20px;
//     text-align: center;
//     padding: 7px 0px;
// `

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useHistory();
  const dispatch = useDispatch();

  const isFetching = useSelector(state => state.user.isFetching);

  //console.log('login re-render');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginStart());
    //console.log({ email, password });
    if (!email || !password) {
      setErr('Please enter your email and password')
      dispatch(loginError());
    }
    else {
      //setErr('');
      publicRequest.post('/auth/login', {
        email,
        password
      }).then(res => {
        if (res.data.isAdmin){
          dispatch(loginSuccess(res.data));
          navigate.push('/');
        }else {
          setErr('Not permit');
          dispatch(loginError());
        }

      }).catch(error => {
        //console.log(error);
        dispatch(loginError());
        setErr('Something went wrong.')
      })
    }
  }

  return (
    <Container>
      <Wrapper>
        <Form>
          <Title>LOGIN</Title>
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
        {/* <hr />
        <CreatABtn onClick={() => navigate('/register')}>Create New Account</CreatABtn> */}
      </Wrapper>
    </Container>
  )
}
