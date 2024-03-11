import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useCreateReviewMutation } from '../Slices/productSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from "../components/Loader"
import Message from "../components/Message"
import {toast} from "react-toastify"


const ReviewScreen = () => {
    const {id:productId}= useParams();

    const [rating,setReview] = useState("");
    const [comment ,setcomment]= useState("");
    // const[Date,setDate] = useState("");
    const navigate = useNavigate();

//    const {data} = useGetOrderDetailsQuery(orderId)
   const [createreview,{isLoading:reviewloading,error}] = useCreateReviewMutation()

//    console.log(useCreateReviewMutation());
//

   const submitHandler = async(e)=>{
    e.preventDefault();
    try {
        // console.log(rating);
        // console.log(comment);
        // const date = Date.now()
        // console.log(date)

        const review= await createreview({rating,comment,productId}).unwrap();
        console.log(review)
        toast.success("Reviewed Successfully");
        navigate("/")

    } catch (error) {
        toast.error("Product Reviewed already")
        console.log(error)
        navigate("/")
        
    }
   }



  return (
    <>
    {reviewloading?(<Loader/>):error?(<Message>{error?.error?.message ||error?.error}</Message>):(
    <Container className='m-3'>
        <FormContainer>
            <h2>Review for product #{productId}</h2>
        <Form className='m-3' onSubmit={submitHandler}>
            <Form.Group id='rating' >
                <Form.Label><strong>Rating</strong></Form.Label>
                <Form.Control as="select"  value={rating} onChange={(e)=> setReview(Number((e.target.value)))} >
                  <option></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
                <Form.Group id='comment' >
                    <Form.Label><strong>Comment</strong></Form.Label>
                    <Form.Control as="textarea" rows="3" cols="4" charswidth ="23" style={{resize:'none'}} value={comment} onChange={(e)=>setcomment(e.target.value)}>
                       
                    </Form.Control>
                </Form.Group>
            </Form.Group>
            <Button className="my-3"type='info' >Submit</Button>
         
        </Form>
        </FormContainer>  
    </Container>
    )}
    </>
  )
}

export default ReviewScreen
