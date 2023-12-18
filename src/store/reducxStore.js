import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSclice = createSlice({
    name: 'auth',
    initialState: {
        accountIdOnAuth:null,
        accountTypeOnAuth:null,
        loggedIn:false,
        cart: [],
        cartQuantity:{}
    },
    reducers:{
        setLoginTrueWith(state,{payload}){
            state.accountIdOnAuth = payload.accountIdOnAuth;
            state.accountTypeOnAuth = payload.accountTypeOnAuth;
            state.loggedIn = payload.loggedIn;
        },
        setLoginFalse(state){
            state.accountIdOnAuth = null;
            state.accountTypeOnAuth = null;
            state.loggedIn = false;
        },
        setItemToCart(state,{payload}){
            state.cart.push(payload);
        },
        removeFromCart(state,{payload}){
            state.cart=state.cart.filter(item=>item!==payload)
        },
        increment(state,{payload}){
            state.cartQuantity={
                ...state.cartQuantity,
                [payload]:(state.cartQuantity[payload]||0)+1,
            };
        },
        decrement(state,{payload}){
            const currentCount = state.cartQuantity[payload]||0;
            const updatedCount = currentCount>0?currentCount-1:0;
            state.cartQuantity={
                ...state.cartQuantity,
                [payload]: updatedCount
            }
        }
    }
}) 


export const {setLoginTrueWith,setLoginFalse,setItemToCart,removeFromCart,increment,decrement} = authSclice.actions;
const reduxStore = configureStore({
    reducer:authSclice.reducer
})

reduxStore.subscribe(()=>{
    const {cart,cartQuantity}=reduxStore.getState();
    localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity));
    localStorage.setItem('cart',JSON.stringify(cart));
})

export default reduxStore;