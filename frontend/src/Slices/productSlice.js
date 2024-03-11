import { apiSlice } from "./apiSlice";
import { IMAGE_URL, PRODUCTS_URL } from "../constants";


export const productSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts : builder.query({
            query:({keyword,pageNumber})=>({
                url:PRODUCTS_URL,
                params:{
                    keyword,
                    pageNumber
                }
            }),
            keepUnusedDataFor:5,
            providesTags:["Product"]
        }),
        getProductDetails: builder.query({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor:5
        }),
        createProduct:builder.mutation({
            query:()=>({
                url:PRODUCTS_URL,
                method:"POST"
            }),
            invalidatesTags:["Product"]

        }),
        updateProduct:builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data.productId}`,
                method:"PUT",
                body:data
            }),
            invalidatesTags:["Product"]
        }),
        deleteProduct:builder.mutation({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
                method:"DELETE",
            })
        }),
        createReview:builder.mutation({
            query:(data)=>({
              url:`${PRODUCTS_URL}/${data.productId}/review`,
              method:"POST",
              body:data
            }),
            invalidatesTags:["Product"]
        }),
        getReview:builder.query({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}/review/view`,
            }),
            keepUnusedDataFor:5
        }),
        imageUpload:builder.mutation({
            query:(data)=>({
                url:IMAGE_URL,
                method:"POST",
                body:data
            })
        }),
        getTopProducts:builder.query({
            query:()=>({
                url:`${PRODUCTS_URL}/top`
            }),
            keepUnusedDataFor:5
        })
    })
})

export const {useGetProductsQuery,useGetProductDetailsQuery,useCreateProductMutation,useUpdateProductMutation,useDeleteProductMutation,useCreateReviewMutation,useGetReviewQuery,useImageUploadMutation,useGetTopProductsQuery} = productSlice