import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {SavepaymentMethod} from "../Slices/cartSlice"

const PaymentScreen = () => {
    const [payment,setPayment]= useState("Cash on delivery")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state)=>state.cart)

    const {shippingAddress} = cart

    useEffect(()=>{
        
      if(!shippingAddress){
        navigate("/login")
      }
    },[navigate, shippingAddress])

    const submitHandler = (e)=>{
      e.preventDefault();
      dispatch(SavepaymentMethod(payment))
      navigate("/placeorder")
    }



  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Select Payment</h1>
        <Form >
            <Form.Group>
                <Form.Label>Select Method</Form.Label>
                <Col>
                <Form.Check type='radio' className='my-2'label="Cash on Delivery" id='paypal' name={payment} value="COD" checked onChange={(e)=>setPayment(e.target.value)}>
                </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary' className='my-2' onClick={submitHandler}>continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen