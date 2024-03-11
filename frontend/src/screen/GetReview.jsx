import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetReviewQuery } from '../Slices/productSlice';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from "../components/ratings"

const GetReview = () => {

    const {id:productId} = useParams();

    const {data,isLoading,error,refetch} = useGetReviewQuery(productId);

     const maindata = {...data}
    // console.log(maindata)
    const {product,total} = maindata

    console.log(total)

    // console.log(useGetReviewQuery(productId));
  return (
    <div >
      {isLoading?<Loader/>:error?<Message></Message>:
      <Container>
        <h1 className='my-3' style={{color:"royalblue"}}>Reviews</h1>
        {product.review.map((review)=>(
          <ListGroup variant='flush'>
          <div>
            <div className="rating">
              <p><strong>{review.name}</strong></p>
              <Rating value={review.rating}></Rating> 
            </div>
            <ListGroup >
              <ListGroup.Item className='mb-3 ' style={{backgroundColor:"grey", color:"White"}}>
                {review.comment}
              </ListGroup.Item>
            </ListGroup>
          </div>
          </ListGroup>
      ))}
      </Container>
}
      
    </div>
  )
}

export default GetReview
