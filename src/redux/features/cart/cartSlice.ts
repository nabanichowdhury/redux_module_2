import { IProduct } from "@/types/globalTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface ICart{
    products:IProduct[],
    total:number


}
const initialState:ICart={
    products:[],
    total:0,
}
const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<IProduct>)=>{
            const exist=state.products.find(product=>product._id===action.payload._id)
            if(!exist){
                state.products.push({...action.payload,quantity:1})
            }else{
                exist.quantity=exist.quantity!+1;
            }
            state.total+=action.payload.price
        },
        removeOne:(state,action:PayloadAction<IProduct>)=>{
            const exist=state.products.find(product=>product._id===action.payload._id)
            if(exist && exist.quantity!>1){
                exist.quantity=exist.quantity!-1;

            }else{
                state.products=state.products.filter(product=>product._id!==action.payload._id)

            }
            state.total-=action.payload.price
        
        },
        removeFromCart:(state,action:PayloadAction<IProduct>)=>{
            state.products=state.products.filter(product=>product._id!==action.payload._id)
            state.total-=action.payload.price*action.payload.quantity!
        


        }
    }
})
export const {addToCart,removeFromCart,removeOne}=cartSlice.actions
export default cartSlice.reducer