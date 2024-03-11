import { PAYMENT_URL } from "../constants";
import { apiSlice } from "./apiSlice";



const paymentApislice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       payment:builder.mutation({
        query:()=>({
            url:PAYMENT_URL,
            method:"POST",

        }),
        
       })
    })
})

export const {usePaymentMutation} = paymentApislice