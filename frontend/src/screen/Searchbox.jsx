import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'



const Searchbox = () => {
    const {keyword:urlkeyword} = useParams();
    const [keyword,setKeyword] =useState(urlkeyword || "");
    const navigate = useNavigate();
     
    const submitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            setKeyword("")
            navigate(`/search/${keyword}`)
        }else{
            navigate("/")
        }


    }
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control type='text' value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder='Search for products..' >

        </Form.Control>
        <Button type='submit' variant='outline-light' className='p-2 mx-2'>Search</Button>


      
    </Form>
  )
}

export default Searchbox
