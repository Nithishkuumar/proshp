import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Success = () => {
    


  return (
    <Container>
      <Row>
      Thank you for placing the order ❤️. 
      </Row>
      <Link to="/">Continue shopping....! </Link>
    </Container>
  )
}

export default Success
