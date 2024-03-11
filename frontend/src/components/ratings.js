import React from 'react'
import { FaStar,FaStarHalfAlt,FaRegStar } from 'react-icons/fa'

const ratings = ({value,text}) => {
  return (
    <div className='rating'>
    <div >
       <span>
        {value >=1?<FaStar style={{color:'yellow'}}></FaStar> :value>=0.5?<FaStarHalfAlt style={{color:'yellow'}}></FaStarHalfAlt>:<FaRegStar></FaRegStar>}
       </span>
       <span>
        {value >=2?<FaStar style={{color:'yellow'}}></FaStar> :value>=1.5?<FaStarHalfAlt style={{color:'yellow'}}></FaStarHalfAlt>:<FaRegStar></FaRegStar>}
       </span>
       <span>
        {value >=3?<FaStar style={{color:'yellow'}}></FaStar> :value>=2.5?<FaStarHalfAlt style={{color:'yellow'}}></FaStarHalfAlt>:<FaRegStar></FaRegStar>}
       </span>
       <span>
        {value >=4?<FaStar style={{color:'yellow'}}></FaStar> :value>=3.5?<FaStarHalfAlt style={{color:'yellow'}}></FaStarHalfAlt>:<FaRegStar></FaRegStar>}
       </span>
       <span>
        {value >=5?<FaStar style={{color:'yellow'}}></FaStar> :value>=4.5?<FaStarHalfAlt style={{color:'yellow'}}></FaStarHalfAlt>:<FaRegStar></FaRegStar>}
       </span>
       </div>
       <div>
       <span>{text} reviews</span>
       </div>
    </div>
  )
}

export default ratings