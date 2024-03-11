import React, { useEffect, useState } from 'react'
import FormContainer from '../../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserQuery, useUpdateAdminUserMutation } from '../../Slices/userSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { toast } from 'react-toastify'

const EditUser = () => {

    const {id:userId} = useParams();
    const navigate = useNavigate();
    

    const [name,setName]= useState("");
    const[email,setEmail]=useState("");
    const[isAdmin,setisAdmin]=useState("")

    const {data:user,isLoading,error,refetch}=useGetUserQuery(userId)
    const [updateuser,{isLoading:updateloading}]= useUpdateAdminUserMutation()
    
    const updateuserHandler = async()=>{
        try {
            const userupdate = {
                userId,
                name,
                email,
                isAdmin
            }
            await updateuser(userupdate).unwrap();
            toast.success("User Updated");
            navigate("/admin/userslist");
            

        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setisAdmin(user.isAdmin)
        }

    },[user])

     

     
  return (
    <>
    {updateloading && <Loader/>}
    {isLoading?<Loader/>:error?<Message variant="danger">{error?.data?.message || error?.error}</Message>:(
    <FormContainer>
        <h2 className='m-3'>Edit User</h2>
        <Form className='m-3'>
            <Form.Group id="name">
                <Form.Label><strong>Name</strong></Form.Label>
                <Form.Control value={name} onChange={(e)=>setName(e.target.value)}type='text' ></Form.Control>
            </Form.Group>
            <Form.Group id="name">
                <Form.Label><strong>Email</strong></Form.Label>
                <Form.Control value ={email} onChange = {(e)=>setEmail(e.target.value)}type='text' ></Form.Control>
            </Form.Group>
            <Form.Group>
            <Form.Check type='checkbox' label="is Admin" checked={isAdmin} onChange={(e)=>setisAdmin(e.target.checked)}></Form.Check>
            </Form.Group>
            <Button className="my-3" onClick={updateuserHandler}>Update</Button>

        </Form>
      
    </FormContainer>
     )}
    </>
  )
}

export default EditUser
