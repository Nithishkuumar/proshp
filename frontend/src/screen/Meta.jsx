import React from 'react'
import { Helmet } from 'react-helmet-async'

const Meta = ({title,keywords,description}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='keywords' content={keywords}></meta>
        <meta name='description' content={description}></meta>
    </Helmet>

   
  )
}
Meta.defaultProps={
    title:"Welcome to proshop",
    keywords:"Buy electronics",
    description:"We sell products"
        
}
export default Meta
