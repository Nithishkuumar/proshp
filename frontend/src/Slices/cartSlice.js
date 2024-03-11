import { createSlice } from "@reduxjs/toolkit";


const initialState = localStorage.getItem("cart")?(JSON.parse(localStorage.getItem("cart"))):({cartItems:[],shippingAddress:{},paymentMethod:""})

const cartSlice = createSlice({
   name:"cart",
   initialState,
   reducers:{
    addtoCart : (state,action)=>{
        const item = action.payload;

        const existitem = state.cartItems.find((x)=>x._id===item._id)

        if(existitem){
            state.cartItems = state.cartItems.map((x)=> x._id===existitem._id?item:x)
        }else{
            state.cartItems = [...state.cartItems,item]
        }
       /// cal item price ///
        state.itemprice = state.cartItems.reduce((acc,item)=>acc+item.price * item.qty,0)

        //cal shipping price //

        state.shippingprice = state.itemprice>100?0:10;

        /// cal tax price //

        state.taxprice = Number(0.15*state.itemprice)

        // cal total price //

        state.totalprice = (Number(state.itemprice)+Number(state.shippingprice)+Number(state.taxprice)).toFixed(2)

        localStorage.setItem("cart",JSON.stringify(state));

    },
    removefromCart :(state,action)=>{
        state.cartItems = state.cartItems.filter((x)=>x._id!== action.payload)
        localStorage.setItem("cart",JSON.stringify(state));

    },
    SaveshippingAddress:(state,action)=>{
        state.shippingAddress = action.payload
        localStorage.setItem("cart",JSON.stringify(state));
    },
    SavepaymentMethod : (state,action)=>{
        state.paymentMethod = action.payload
        localStorage.setItem("cart",JSON.stringify(state))
    },
    clearCart :(state,action)=>{
        state.cartItems = []
        localStorage.setItem("cart",JSON.stringify(state));
    }
   }
   
})
export const {addtoCart,removefromCart,SaveshippingAddress,SavepaymentMethod,clearCart} =cartSlice.actions;
export default cartSlice.reducer;