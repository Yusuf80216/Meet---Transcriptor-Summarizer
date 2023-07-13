// STEP 1 :  creating Slice 
const { createSlice } = require("@reduxjs/toolkit");

const initialState = [];

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers: {
        add(state ,action){
            // old redux :
            // return [...state , action.payload]
            // Redux Toolkit :
            state.push(action.payload)
        },
        remove(state ,action){
             return state.filter((item)=> item.id !== action.payload)
        },
        // if more function/property are there, add them below,
    }
});
export const { add , remove } = cartSlice.actions  // exporting actions 
export default cartSlice.reducer // exporting reducer
// if more reducers are there, export them below.

// previously we were doing as : 
/*
    {
        type : 'add/cart',
        payload : 1
    }

    instead of this , now we are using CreateSlice function
*/