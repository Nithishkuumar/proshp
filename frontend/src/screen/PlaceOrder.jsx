import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from "../components/Loader"
import {clearCart} from "../Slices/cartSlice"
import { useCreateOrderMutation } from '../Slices/orderApiSlice';
import { toast } from 'react-toastify';

const PlaceOrder = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.cart)
    const [createOrder , {isLoading }] = useCreateOrderMutation();


    useEffect(()=>{
       if(!cart.shippingAddress.address){
        navigate("/shipping")
       }else if(!cart.paymentMethod){
        navigate("/payment")

       }
    },[cart.paymentMethod, cart.shippingAddress, navigate])

    const placeOrderHandler = async()=>{
        // console.log(cart.shippingAddress);
      try {
        const res = await createOrder({
            orderItems : cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemprice:cart.itemprice,
            shippingprice:cart.shippingprice,
            taxprice:cart.taxprice,
            totalprice:cart.totalprice,
            
        }).unwrap();
        console.log(res);
        dispatch(clearCart());
        navigate(`/order/${res._id}`);
      } catch (error) {
        toast.error(error)
        console.log(error)
      }

    }



   return (
    <>
       <CheckoutSteps step1 step2 step3 step4 />
       <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h1>
                        Shipping
                    </h1>
                    <p>
                        <strong>
                            Address:  
                        </strong>
                        {cart.shippingAddress.address},{cart.shippingAddress.state},{cart.shippingAddress.postalcode},{cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>
                        Method: 
                    </strong>
                    {cart.paymentMethod}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cart.cartItems.length===0?(
                        <Message variant="danger">Your cart is empty</Message>
                    ):(
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item,index)=>(
                                <ListGroup.Item key={index}>
                                  <Row>
                                    <Col md={2}>
                                       <Image 
                                       src={item.image}
                                       alt={item.name}
                                       fluid
                                       rounded
                                       >
                                       </Image>
                                    </Col>
                                    <Col>
                                    <Link to={`/product/${item._id}`}>
                                        {item.name}
                                    </Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x {item.price} = ${item.qty * item.price}
                                    </Col>
                                  </Row>

                                </ListGroup.Item>

                            ))}
                        </ListGroup>

                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Items:
                            </Col>
                            <Col>
                            ${cart.itemprice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Shipping:
                            </Col>
                            <Col>
                            ${cart.shippingprice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Tax:
                            </Col>
                            <Col>
                            ${cart.taxprice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Total:
                            </Col>
                            <Col>
                            ${cart.totalprice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                 {/* {error && <Message variant="danger">{error}</Message>} */}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' onClick={placeOrderHandler}>Place Order</Button>
                    </ListGroup.Item>
                   {isLoading && <Loader/>}
                </ListGroup>
            </Card>
        </Col>
       </Row>
    </>
  )
}

export default PlaceOrder
