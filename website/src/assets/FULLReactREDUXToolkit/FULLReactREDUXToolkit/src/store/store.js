// STEP 2 : configureStore / creatingStore / createStore
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import productReducer from './productSlice'
// just like , in step1 , we created Slice and passed object.. same have we will do that here.
const store = configureStore({
    // this is cartSlice.reducer that we exported.
    reducer : {
        // name : reducer    => name is taken from slice
        cart : cartReducer,
        product : productReducer
        // now if we have created another slice., simply add it below.
        // example:  products : productReducer  <-- like this.
    }
})

export default store;