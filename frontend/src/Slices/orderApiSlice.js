import {apiSlice} from "../Slices/apiSlice";
import { ORDERS_URL } from "../constants";


const orderApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       createOrder:builder.mutation({
        query:(order)=>({
            url:ORDERS_URL,
            method:"POST",
            body:{...order}
        })
       }),
       getOrderDetails:builder.query({
         query:(orderId)=>({
            url:`${ORDERS_URL}/${orderId}`,
         }),
         keepUnusedDataFor:5
       }),
       getAllorders:builder.query({
        query:()=>({
          url:`${ORDERS_URL}/myorders`,
        }),
        keepUnusedDataFor:5
       }),
       getAdminOrders:builder.query({
        query:()=>({
          url:ORDERS_URL,
          method:"GET"
        }),
        keepUnusedDataFor:5
       }),
       UpdatetoPaid:builder.mutation({
        query:(orderId)=>({
          url:`${ORDERS_URL}/${orderId}/pay`,
          method:"PUT"
        })
       }),
       updateOrderdelievered:builder.mutation({
        query:(orderId)=>({
          url:`${ORDERS_URL}/${orderId}/deliver`,
          method:"PUT"
        })
       }),
      //  createReview:builder.mutation({
      //   query:(data)=>({
      //     url:`${ORDERS_URL}/${data.orderId}/review`,
      //     method:"POST"
      //   }),
      //   invalidatesTags:["Order"]
      //  })


        
    })
})


export const {useCreateOrderMutation,useGetOrderDetailsQuery,useGetAllordersQuery,useGetAdminOrdersQuery,useUpdatetoPaidMutation,useUpdateOrderdelieveredMutation} = orderApiSlice 