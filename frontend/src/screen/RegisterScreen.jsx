import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {Link, useNavigate} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {setCrenditials} from '../Slices/authSlice'
import { useRegisterMutation } from '../Slices/userSlice'
import {toast} from "react-toastify"
import Loader from '../components/Loader'


const RegisterScreen = () => {
    const [email,setEmail]= useState("");
    const [name,setName]= useState("")
    const [password,setPassword]=useState("")
    const[passwordconfirm,setPasswordConfirm]=useState("");


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register,{isLoading}] = useRegisterMutation()
    

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
       if(password!==passwordconfirm){
        toast.error("Password Mismatch")
       }else{

       try {
        const res = await register({name,email,password}).unwrap()
        dispatch(setCrenditials({...res}))
        toast.success("Registered Successful")
        navigate(redirect)
        
       } catch (error) {
          toast.error(error?.data.message || error?.error)
        
       }
    }}

  return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form >
        <Form.Group controlId='name' className='my-3'>
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control type='name' placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
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
            <Form.Group controlId='passwordconfirm' className='my-3'>
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control type='password' placeholder='Reenter your password' value={passwordconfirm} onChange={(e)=>setPasswordConfirm(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit' className='mt-3' disabled={isLoading} onClick={submitHandler}>
                Register
            </Button>
        </Form>
         {isLoading && <Loader/>}
        <Row className='py-3'>
            <Col>
            Already have an account <Link to={redirect?`/login?redirect=${redirect}`:"/login"}>login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen