import React from 'react'
import { useGetAdminOrdersQuery } from '../../Slices/orderApiSlice'
import { Button, Row, Table } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { LinkContainer } from 'react-router-bootstrap';

const Orderlist = () => {
    const {data:orders , isLoading,error}= useGetAdminOrdersQuery();
    console.log(orders);
    
  return (
    <> 
    {isLoading?(
        <Loader/>
    ):error?(
        <Message variant="danger">{error?.error?.data || error.error}</Message>
    ):(
    <Row>
      <h1>Orders History</h1>

      <Table striped hover bordered responsive="md" >
        <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order)=>(
                <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.totalprice}</td>
                    {order.isPaid?(
                        <td>{order.paidAt.substring(0,10)}</td>
                    ):(<td><FaTimes style={{color:"red"}}/></td>)}
                    {order.isDelievered?(
                        <td>{order.delieveredAt.substring(0,10)}</td>
                    ):(<td><FaTimes style={{color:"red"}}/></td>)}
                    <td>
                        <LinkContainer to={`/order/${order._id}`}>
                            <Button variant='light' className='btn-sm'>Details</Button>
                        </LinkContainer>
                    </td>
                </tr>
            ))}
        </tbody>
      </Table>
    </Row>
    )}
    </>
  )
 
}

export default Orderlist
