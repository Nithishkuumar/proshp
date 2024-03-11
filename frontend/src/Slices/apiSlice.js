import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {BASE_URL} from "../constants";

const basequery = fetchBaseQuery({baseUrl:BASE_URL})

export const apiSlice = createApi({
    baseQuery:basequery,
    tagTypes:["Product","User","Order"],
    endpoints:(builder)=>({
        
    })


}) 