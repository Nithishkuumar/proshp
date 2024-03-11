import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login : builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/login`,
                method:"POST",
                body:data,

            }),
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/register`,
                method:"POST",
                body:data
            })

        }),
        logout:builder.mutation({
            query:()=>({
            url:`${USERS_URL}/logout`,
            method:"POST"

            })
    }),
    profile:builder.mutation({
        query:(data)=>({
            url:`${USERS_URL}/profile`,
            method:"PUT",
            body:data

        })
    }),
    getUsers:builder.query({
        query:()=>({
            url:USERS_URL,
        }),
        keepUnusedDataFor:5,
        providesTags:["User"]
    }),
    deleteuser:builder.mutation({
        query:(userId)=>({
           url:`${USERS_URL}/${userId}`,
           method:"DELETE"
        })
    }),
    updateAdminUser:builder.mutation({
        query:(data)=>({
            url:`${USERS_URL}/${data.userId}`,
            method:"PUT",
            body:data
        }),
        invalidatesTags:["User"]
    }),
    getUser:builder.query({
        query:(userId)=>({
            url:`${USERS_URL}/${userId}`
        }),
        keepUnusedDataFor:5
    })
    })
})

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileMutation,useGetUsersQuery,useDeleteuserMutation,useGetUserQuery,useUpdateAdminUserMutation} = userApiSlice