import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {Link, useNavigate} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {setCrenditials} from '../Slices/authSlice'
import { useLoginMutation } from '../Slices/userSlice'
import {toast} from "react-toastify"
import Loader from '../components/Loader'


const LoginScreen = () => {
    const [email,setEmail]= useState("");
    const [password,setPassword]=useState("")


    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(useLoginMutation());
    const [login,{isLoading}] = useLoginMutation()
    

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/"

    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }

    },[navigate, redirect, userInfo])
  
    const submitHandler = async(e)=>{
       e.preventDefault();

       try {
        const res = await login({email,password}).unwrap()
        dispatch(setCrenditials({...res}))
        toast.success("Login Successful")
        navigate(redirect)
        
       } catch (error) {
          toast.error(error?.data.message || error?.error)
        
       }
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form >
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>
                    Email Address
                </Form.Label>
                <Form.Control type='email' placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control type='password' placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit' className='mt-3' disabled={isLoading} onClick={submitHandler}>
                SignIn
            </Button>
        </Form>
         {isLoading && <Loader/>}
        <Row className='py-3'>
            <Col>
            New Customer ? <Link to={redirect?`/register?redirect=${redirect}`:"/register"}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen