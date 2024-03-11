import React from 'react'
// import { useEffect,useState } from 'react'
import { Col, Row } from 'react-bootstrap'
// import axios from 'axios'
import Product from '../components/product'
import { useGetProductsQuery } from '../Slices/productSlice'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from "../screen/Paginate"
import ProductCarousel from './ProductCarousel';
import Meta from './Meta';

// const Homescreen = () => {
  // const [products,setProducts] = useState([]);

  // useEffect(()=>{
  //   const fetchproducts = async()=>{
  //     const {data} = await axios.get("/api/products");
  //     console.log(data.data)
  //     setProducts(data.data.products);
      
  //   }
  //   fetchproducts()
    

  
  // },[])
  const Homescreen = () => {
   

    const {keyword,pageNumber} = useParams();
  const {data ,isLoading , error} = useGetProductsQuery({keyword,pageNumber});

  // console.log(useGetProductsQuery());
  // const first = data.data
  // console.log(data);
  // // console.log(first);
  // // // console.log(products);s
  // // console.log(currentData);
  // // const {data} = currentData;
  // // console.log(currentData.data)
  // const mydat ={...data}
  // // console.log(mydat);
  // const {data:mydata} = mydat;
  // // console.log(currentdata);
  // // console.log(dataa)
  // //  console.log(mydata);
  // const allproduct = {...mydata}
  // // console.log(allproduct);
  // const {products}= allproduct

 

   
  return (
    <>
    {isLoading ? (<Loader></Loader>) : error ? (<Message variant="danger">
      {error?.data.message || error.error}

    </Message>) :( 
    <> 
     <Meta/>
     {!keyword &&   <ProductCarousel/>}
    {!keyword?<h1> Latest Products</h1>:<h1>Search Results</h1>}
        <Row >
            {data.products.map((product)=>(
            <Col key= {product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} key={product._id}/>
            </Col>
             ))}
        </Row>
        <Paginate pages={data.pages} page={data.page}/>
        
    </>
    )}
    </>
      
  );
};

export default Homescreen
