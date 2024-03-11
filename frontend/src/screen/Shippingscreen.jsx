import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SaveshippingAddress } from '../Slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';


 

const Shippingscreen = () => {

    const cart = useSelector((state)=>state.cart);
    const {shippingAddress} = cart


    const [address,setAddress] = useState(shippingAddress.address || "");
    const [city,setCity] = useState(shippingAddress.city || "");
    const [postalcode,setPostalcode]=  useState(shippingAddress.postalcode || "");
    const [country,setCountry]=useState(shippingAddress.country || "")

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(SaveshippingAddress({address,city,postalcode,country}))
        navigate("/payment")
        
    }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
        <h1 >Shipping Address</h1>
        <Form >
          <Form.Group controlId="address" className='my-3'>
            <Form.Label>
                Enter your address
            </Form.Label>
            <Form.Control type="text"  value={address} onChange = {(e)=>setAddress(e.target.value)}  required>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="city" className='my-3'>
            <Form.Label>
                Enter your city
            </Form.Label>
            <Form.Control type="text"  value={city} onChange = {(e)=>setCity(e.target.value)} required>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="postalcode" className='my-3'>
            <Form.Label>
                Enter Postal Code
            </Form.Label>
            <Form.Control type="number" min="1" max="9"  value={postalcode} onChange = {(e)=>setPostalcode(e.target.value)} required>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="counrty" className='my-3'>
            <Form.Label>
                Enter your country
            </Form.Label>
            <Form.Control type="text"  value={country} onChange = {(e)=>setCountry(e.target.value)} required={true}  >
            </Form.Control>
          </Form.Group>
        </Form>
        {address&&city&&postalcode&&country&&<Button onClick={submitHandler} type='submit' variant='primary' >
            Proceed

        </Button>}
    </FormContainer>
  )
}

export default Shippingscreen