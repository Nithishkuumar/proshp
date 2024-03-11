import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import { useGetProductDetailsQuery, useImageUploadMutation, useUpdateProductMutation } from '../../Slices/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import {toast} from "react-toastify"

const EditProductScreen = () => {
    const [name,setName]= useState("");
    const[image,setImage]= useState("")
    const[price,setPrice] =useState("");
    const [category,setCategory] =useState("");
    const [brand,setBrand] =useState("");
    const [description,setDescription] = useState("");
    const [countInstock,setcountInstock ]= useState(""); 

    const {id:productId}= useParams();

    const {data,isLoading,error,refetch}= useGetProductDetailsQuery(productId)

    const [updateproduct ,{isLoading:productloading,error:producterror}] = useUpdateProductMutation()
    const [uploadImage,{isLoading:imageloading}] = useImageUploadMutation();
    const navigate = useNavigate();

    const mydat ={...data}
    // console.log(mydat);
    const {data:mydata} = mydat;
    // console.log(currentdata);
    // console.log(dataa)
    //  console.log(mydata);
    const products = {...mydata}
    // console.log(products);
    const {product}= products
   

    useEffect(()=>{
        if(product){
            setName(product.name)
            setPrice(product.price)
            setCategory(product.category)
            setBrand(product.brand)
            setDescription(product.description)
            setcountInstock(product.countInstock)
            setImage(product.image)
        }
    },[product])

    const uploadfile = async(e)=>{
       const formData = new FormData();
       formData.append("image",e.target.files[0])
       console.log(e.target.files[0])
       try {
        const res = await uploadImage(formData).unwrap();
        toast.success(res.message)
        setImage(res.image)

       } catch (error) {
        console.log(error)
        
       }


    }


    const submitHandler =async(e)=>{
        e.preventDefault();
        console.log("clicked")
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            category,
            brand,
            description,
            countInstock
        }
         try {
            const finalproduct = await updateproduct(updatedProduct).unwrap()
            console.log(finalproduct)
            navigate("/admin/productslist")
            refetch();
            toast.success("Product Updated")
         } catch (error) {
            console.log(error)
            
         }
       
        
    }
  

  return (
    <>
          <h1 style={{textAlign:'center'}}>Edit Product</h1>
          {imageloading?.productloading && <Loader/>}
          {isLoading?<Loader/>:error?(
            <Message variant="danger">{error?.data?.message || error?.error}</Message>  
          ):(
          <FormContainer>
            <Form onSubmit={submitHandler}>
            <Form.Group id='name' className='my-3'>
                <strong><Form.Label>Name</Form.Label></strong>
                <Form.Control type='text' value={name} placeholder='Enter product name' onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group id='price' className='my-3'>
                <strong><Form.Label>Price</Form.Label></strong>
                <Form.Control type='number' value={price} placeholder='Enter product price' onChange={(e)=>setPrice(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group id='image' className='my-3'>
                <strong><Form.Label>Price</Form.Label></strong>
                <Form.Control type='text' value={image} placeholder='Enter image url' onChange={(e)=>setImage}></Form.Control>
                <Form.Control type='file' label="Choose file" onChange={uploadfile}></Form.Control>
            </Form.Group>
            <Form.Group id='category' className='my-3'>
                <strong><Form.Label>Category</Form.Label></strong>
                <Form.Control type='text' value={category} placeholder='Enter category name' onChange={(e)=>setCategory(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group id='brand' className='my-3'>
                <strong><Form.Label>Brand</Form.Label></strong>
                <Form.Control type='text' value={brand} placeholder='Enter product brand' onChange={(e)=>setBrand(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group id='description' className='my-3'>
                <strong><Form.Label>Description</Form.Label></strong>
                <Form.Control type='text' value={description} placeholder='Enter product description' onChange={(e)=>setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group id='countInstock' className='my-3'>
                <strong><Form.Label>Count In stock</Form.Label></strong>
                <Form.Control type='number' value={countInstock} placeholder='Enter product count in stock' onChange={(e)=>setcountInstock(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='primary'>Update</Button>
            </Form>
          </FormContainer>
          )}
      
    </>
  )
}

export default EditProductScreen
