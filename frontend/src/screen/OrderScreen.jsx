import React from 'react'
import { useGetOrderDetailsQuery, useUpdateOrderdelieveredMutation, useUpdatetoPaidMutation } from "../Slices/orderApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import {Row, Col,Button, ListGroup, Image, Card} from "react-bootstrap"

import Loader from '../components/Loader';
import Message from '../components/Message';
import { usePaymentMutation } from '../Slices/paymentApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify"



const OrderScreen = () => {

    const navigate = useNavigate();
    const {id:orderId} = useParams();
    const {userInfo} = useSelector((state)=>state.auth)


    // const {cartItems} =useSelector((state)=>state.cart)
    // console.log(cartItems)
  

    const {data:Order,isLoading,error,refetch, originalArgs} = useGetOrderDetailsQuery(orderId);
    const [updatedOrder,{isLoading:orderloading}] = useUpdatetoPaidMutation();
    const [updatedeliver,{isLoading:deliverloading}] = useUpdateOrderdelieveredMutation();

//   const makepaymentHandler = async()=>{
//     const stripe = await loadStripe("pk_test_51Oi9pxSAmH8JXYb4OQPXprmigImewmKP9KK6aBFAyGd760hKVO8O6D5nBLZl4DKlodVq75EOQlY6eTPngkCEvsIr00tfFK8kDw")

//     const body ={
//         order:Order, 
//     }
//     const headers={
//         "Content-Type":"application/json"
//     }

//     const res = await fetch(`http://localhost:3000/api/checkout-session/${originalArgs}`,{
//         method:"POST",
//         headers,
//         body:JSON.stringify(body)
//     })
//     const session = await res.json();
//     console.log(session);
//     const result = stripe.redirectToCheckout({
//         sessionId:session.id
//     })
//     navigate("/finalpage")
// }
   const updateOrderPaid = async()=>{
    try {
        await updatedOrder(orderId)
         refetch();
        toast.success("Order Paid")
        
    } catch (error) {
        console.log(error);
        toast.error("Smoething went wrong in paying")
        
    }

   }
   const updateorderdelievered = async()=>{
      try {
        const updatedorder = await updatedeliver(orderId);
        console.log(updatedorder)
        refetch();
        toast.success("Order delievered successfully");

      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in delievering order")
      }

   }

  return (
    <div>
       {isLoading?<Loader/> : error ?<Message variant="danger">{error?.error.message || error?.error}</Message> : (
        <>
        <h1 >OrderId: {originalArgs}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                    <h4 style={{paddingBottom:"5px"}}>Shipping Address</h4>
                    <p>
                        <strong>Name: </strong>{Order.user.name}
                    </p>
                    <p>
                        <strong>Email: </strong>{Order.user.email}
                    </p>
                    <p>
                        <strong>Address: </strong>{Order.shippingAddress.address}, {Order.shippingAddress.city}, {Order.shippingAddress.postalcode}, {Order.shippingAddress.country}
                    </p>
                    <p>
                        {Order.isDelievered?(
                            <Message variant="success">Your Order delieverd on {Order.delieveredAt.substring(0,10)} </Message>
                        ):(
                            <Message variant="danger">Not Delievered</Message>
                        )}
                    </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <p>
                        <strong>Payment Method: </strong>{Order.paymentMethod}
                    </p>
                    <p>
                        {Order.isPaid?(
                            <Message variant="success">Paid on  {Order.paidAt.substring(0,10)} </Message>
                        ):(
                            <Message variant="danger">Not Paid</Message>
                        )}
                    </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {Order.orderItems.map((item,index)=>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                       <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x {item.price} = ${item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item >
                            <h2 >Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items
                                </Col>
                                <Col>${Order.itemprice}
                                </Col>
                            </Row>
                            <Row>
                                <Col>Shipping
                                </Col>
                                <Col>${Order.shippingprice}
                                </Col>
                            </Row>
                            <Row>
                                <Col>Tax
                                </Col>
                                <Col>${Order.taxprice}
                                </Col>
                            </Row>
                            <Row>
                               
                                <Col><strong>Total</strong>
                                </Col>
            
                                <Col><strong>${Order.totalprice}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    {!userInfo.isAdmin?(!Order.isDelievered ?(<LinkContainer to="/">
                    <Button> Proceed to checkout</Button>
                    </LinkContainer>):((!Order.isReviewed && Order.isDelievered)?(<LinkContainer to={`/order/${originalArgs}/review`}>
                        <Button variant='info'>Please write a review about product</Button>
                    </LinkContainer>):(<Button>Reviewed</Button>))
                    ):(<>
                      <Button type='primary' className='my-3' disabled={Order.isPaid} onClick={updateOrderPaid}>Mark as paid</Button>
                      <Button type='primary' disabled={Order.isDelievered} onClick={updateorderdelievered}>Mark as delievered</Button>
                    </>)
                    }
                    {orderloading &&<Loader/>}
                    {deliverloading && <Loader/>}
                </Card>
              
            </Col>
        </Row>
        </>
       )}
    </div>
  )
}

export default OrderScreen
