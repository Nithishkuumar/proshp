import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './ratings'

//// className='m-3 pd-3 rounded'
const product = ({product}) => {
  return (
    <>
    
    <Card  className="card">   
        <Link to={`/product/${product._id}`}>
           <Card.Img className='hover-zoom' src={product.image}></Card.Img>
       </Link>
       <Card.Body>
        <Link  style={{textDecoration:"none"}} to={`/product/${product._id}` }> 
        <Card.Title as="div" className='product-title' >
            <strong>{product.name}</strong>
        </Card.Title>
        <Card.Text as="div">
          <Rating value={product.averageRating} text={product.numRating} key={product.name}></Rating>
        </Card.Text>
        </Link>
        <Card.Text as="h3">
            ${product.price}
        </Card.Text>
       </Card.Body>
    </Card>
    </>
  )
}

export default product