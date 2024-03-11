import React from 'react'
import { useGetTopProductsQuery } from '../Slices/productSlice'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCarousel = () => {

    const {data:products,isLoading,error} = useGetTopProductsQuery();

  return (
    isLoading?<Loader></Loader>:error?<Message>{error}</Message>:(
        <Carousel  interval={2000} pause="hover" className='m-4' style={{background:"#1b2a41"}}>
            {products.map((product)=>(
               
                <Carousel.Item key={product.name}>
                  <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid  ></Image>
                    {/* <img src={product.image} alt={product.name} className='image'></img> */}
                    <Carousel.Caption className="caption" >
                        <h2>{product.name} (${product.price})</h2>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
            ))}


        </Carousel>

    )
  )
}

export default ProductCarousel
