import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, ListGroup, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setCrenditials } from '../Slices/authSlice'
import { toast } from 'react-toastify'
import { useProfileMutation } from '../Slices/userSlice'
import Loader from "../components/Loader"
import { useGetAllordersQuery } from '../Slices/orderApiSlice'
import Message from '../components/Message'
import { FaTimes } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'

const ProfileScreen = () => {
     
    const [name,setName]= useState("")
    const[email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const[confirmpassword,setConfirmPassword]= useState("")

    const {userInfo} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const [updateprofile,{isLoading}] =useProfileMutation();
    const{data:orders,isLoading:ordersloading,error} = useGetAllordersQuery();
    


    useEffect(()=>{
         if(userInfo){
            setName(userInfo.name)
            setEmail(userInfo.email)
         }
    },[userInfo])
   
    const UpdateProfileHandler = async(e)=>{
         e.preventDefault();
      
     if(password!==confirmpassword){
        toast.error("Password Mismatch")
     }else{
        try {
            const res = await updateprofile({_id:userInfo._id,name,email,password}).unwrap();
            toast.success("Profile updated..!")
            dispatch(setCrenditials(res));
            

    
        } catch (error) {
          console.log(error)
            
        }
     }
      

    }

  return (
    <Row className='py-3'>  
       <Col md={3}>
       <h2>Update Profile</h2>
        <Form >
            <Form.Group controlId='name' className='my-2'>
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control value={name} placeholder='name' onChange={(e)=>setName(e.target.value)}>

                </Form.Control>

            </Form.Group>
            <Form.Group controlId='email' className='my-2'>
                <Form.Label>
                    Email
                </Form.Label>
                <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-2'>
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmpassword' className='my-2'>
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} >
                </Form.Control>
            </Form.Group>
            <Button variant='primary' onClick={UpdateProfileHandler}>Update</Button>
            {isLoading && <Loader/>}
        </Form>
       </Col>
       <Col md={9}>
        <h2>My Orders</h2>
       {ordersloading?(<Loader/>):error?(<Message variant="danger">
         {error?.data?.message || error?.error}
       </Message>):(
        <Table striped hover responsive className='table-md'>
            <thead>
                <tr>
                    <th>ORDER ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIEVERED</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order)=>(
                   <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>${order.totalprice}</td>
                    <td>{order.isPaid?(
                        order.paidAt.substring(0,10)
                    ):(
                        <FaTimes style={{color:"red"}}></FaTimes>
                    )}</td>
                    <td>{order.isDelievered?(
                        order.delieveredAt.substring(0,10)
                    ):(
                        <FaTimes style={{color:"red"}}></FaTimes>
                    )}</td>
                    <td>
                        <LinkContainer to={`/order/${order._id}`}>
                            <Button className="btn-sm" type='info'>Details</Button>
                        </LinkContainer>
                    </td>

                   </tr>
                ))}
            </tbody>

        </Table>
       )}

       </Col>
    </Row>
  )
}

export default ProfileScreen
