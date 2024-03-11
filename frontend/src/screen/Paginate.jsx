import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import React from 'react';

const Paginate = ({pages,page,isAdmin=false}) => {
  return (
    pages > 1 && (
      <Pagination className="m-3">
        {[...Array(pages).keys()].map((x)=>(
          <LinkContainer key={x+1} to={
            !isAdmin?`/page/${x+1}`:`/admin/produclist/${x+1}`

          }>
            <Pagination.Item linkClassName=".page"  linkStyle={{color:"black", border:"20px rounded black" }}active={x+1===page}>{x+1}

            </Pagination.Item>
          
          </LinkContainer>

        ))}
      </Pagination>
    )
  )
}

export default Paginate
