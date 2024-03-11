import React from 'react'
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../Slices/productSlice'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import {toast} from "react-toastify"
import { useParams } from 'react-router-dom';

const Productslist = () => {

  // const {data,isLoading,error,refetch}=useGetProductsQuery();
  // console.log(data)
  const {keyword,pageNumber} = useParams();
  const {data ,isLoading , error,refetch} = useGetProductsQuery({keyword,pageNumber});
  // console.log(datas)
  // const first = {...datas}
  // // console.log(first.data)
  // const {data:Sec} = first
  // const Products={...Sec}
  // const {products}= Products

  const [createproduct,{isLoading:createloading}]=useCreateProductMutation();
  const [deleteProduct,{isLoading:deleteloading}]=useDeleteProductMutation();

  const deleteHandler = async(id)=>{
    if(window.confirm("Are you sure to delete?")){
    try {
      await deleteProduct(id);
      refetch();
      toast.success("Product Deleted successfully")
    } catch (error) {
     toast.error(error?.data?.message || error.error)
    }
  }
    
  }

  
  const createProductHandler = async()=>{
    if(window.confirm("Are you sure ? Want to create a product")){
      try {
        await createproduct();
        refetch();
        toast.success("Product Created successfully")
      } catch (error) {
       toast.error(error?.data?.message || error.error)
      }
    }

  }

  return (
    <Row className='m-3'>
      {deleteloading && <Loader/>}
      {createloading && <Loader/>}
      <Col ><h1>Products</h1></Col>
      <Col style={{textAlign:"end"}}><Button className='btn-sm m-3' onClick={createProductHandler}><FaEdit/> Create Product</Button></Col>
       {isLoading?(<Loader/>):error?(
        <Message variant="danger">{error?.error?.data || error?.error}</Message>
       ):(
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product)=>(
              <tr key={product._id}>
                 <td>{product._id}</td>
                 <td>{product.name}</td>
                 <td>{product.price}</td>
                 <td>{product.category}</td>
                 <td>{product.brand}</td>
                 <td>
                  <LinkContainer to={`/admin/productlist/${product._id}/edit`}><Button variant="light" className='btn-sm mx-2'><FaEdit/></Button></LinkContainer>
                  <Button variant='danger' className='btn-sm'onClick={()=>deleteHandler(product._id)}><FaTrash/></Button>
                  </td>
              </tr>
            ))}
          </tbody>

        </Table>
       )}
    </Row>
  )
}

export default Productslist
