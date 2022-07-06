import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { openModal } from "../modal/modalSlice";

const url = 'https://course-api.com/react-useReducer-cart-project';
export const getCartItems = createAsyncThunk('cart/getCartItems', 
async (textFromPassedAppJs, thunkAPI) => {
    try{
        //  console.log(textFromPassedAppJs);
        //  console.log(thunkAPI);
        //  console.log(thunkAPI.getState());
        //  thunkAPI.dispatch(openModal());

        const res = await axios(url);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue('Something Went Wrong !!!');
    }
});


const initialState = {
    cartItems: [],
    amount: 5,
    total: 0,
    isLoading: true,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
          state.cartItems = [];
        },
        removeItem : (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        increase : (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload);
            cartItem.amount += 1;
        },
        decrease : (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload);
            cartItem.amount -= 1;
        },
        calculateTotals : (state) => {
            let total = 0, amount = 0;
            state.cartItems.forEach((item) => {
                total  += item.amount * item.price;
                amount += item.amount;
            });
            state.amount = amount;
            state.total  = total;
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action) => {
            //  console.log(action.payload);
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]: (state, action) => {
            //  console.log(action.payload);
            state.isLoading = false;
        },
    }
});


export const { clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions;
export default cartSlice.reducer;