import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useDeleteuserMutation, useGetUsersQuery } from '../../Slices/userSlice'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {  FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

const Userslist = () => {

    const {data:users,isLoading,error,refetch}= useGetUsersQuery();
    const [deleteuser, {isLoading:deleteloading,error:deleteerror}]  = useDeleteuserMutation();

    const userEditHandler = ()=>{

    }
    const userDeleteHandler = async(id)=>{
      if(window.confirm("Are you sure to delete user?")){
        try {
            await deleteuser(id);
            refetch();
            toast.success("User Deleted")

        } catch (error) {
          console.log(error)
          
        }
      }

    }
   
  return (
    <>
    {deleteloading && <Loader/>}
    {isLoading?<Loader/>:error?(<Message>{error?.data?.message || error?.error}</Message>):
    (
    <Container className='m-3'>
      <h1>Users</h1>
      <Table responsive striped hover> 
        <thead>
            <tr>
             <th><>ID</></th>
             <th><>Name</></th>
             <th><>EMAIL</></th>
             <th><>ISADMIN</></th>
             <th></th>
            </tr>
        </thead>
        <tbody>
            {users.map((user)=>(
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{!user.isAdmin?<FaTimes style={{color:"red"}}/>:<FaCheck style={{color:"green"}}/>}</td>
                    <td>
                        <LinkContainer to={`/admin/userslist/${user._id}/edit`}><Button className='btn-sm mx-2' variant='light'onClick={userEditHandler}><FaEdit/></Button></LinkContainer>
                        <Button className="btn-sm"variant='danger' onClick={()=>userDeleteHandler(user._id)}><FaTrash/></Button>
                    </td>
                    
                    
                </tr>
            ))}
            
        </tbody>
      </Table>
    </Container>
    )}
    </>
  )
}

export default Userslist
