import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { getCookie } from "../../app/api/utility/utility";
import { Basket } from "../../app/models/basket";

export interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async(_, thunkAPI) => {
        try {
            return await agent.Basket.get();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    },
    {
        condition: () => {
            if(!getCookie('buyerId')){
                return false;
            }
        }
    }
) 

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity?: number}>(
    'basket/addBasketItemAsync',
    async ({productId, quantity = 1}) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch (error) {
            console.log(error);
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, {productId: number, quantity: number, name?: string}>(
    'basket/removeBasketItemAsync',
    async ({productId, quantity}) => {
        try {
            return await agent.Basket.removeItem(productId, quantity);
        } catch (error) {
            console.log(error);
        }
    }
)

export const BasketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        clearBasket: (state) =>{
            state.basket = null;
        }
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            console.log(action);
            state.status = "pendingAddItem" + action.meta.arg.productId;
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            console.log(action);
            state.status = "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            console.log(action);
            const { productId, quantity } = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if(itemIndex == -1|| itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity;

            if(state.basket?.items[itemIndex].quantity === 0){
                state.basket.items.splice(itemIndex, 1);
            }

            state.status = "idle";
        });
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = "idle";
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
            console.log(action.payload);
            state.basket = action.payload;
            state.status = "idle";
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected), (state, action) => {
            state.status = "idle";
            console.log(action.payload);
        });
    })
})

export const {setBasket, clearBasket} = BasketSlice.actions;