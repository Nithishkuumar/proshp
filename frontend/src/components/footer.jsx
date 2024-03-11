import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const footer = () => {
    const year =  new Date().getFullYear();
    console.log(year);
  return (
    <footer>
     <Container>
        <Row>
            <Col className='text-center py-3'>
             <p> Copyrights &copy; {year}</p>
            </Col>
        </Row>
     </Container>
      
    </footer>
  )
}

export default footer
