// STEP 1 :  creating Slice 
const { createSlice } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const initialState = {
    data : [],
    status : STATUSES.IDLE,
};

const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers: {
        // state = initialState
        setProducts(state ,action){
            // NEVER DO THE Below ANY async API Call in REDUCER 
            // const response = await fetch('https://fakestoreapi.com/products')
            // so to do api calling in reducer , THUNKS MiddleWare is used
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        }
    }
});
export const {setProducts ,setStatus} = productSlice.actions  // exporting actions 
export default productSlice.reducer // exporting reducer


// Thunks 
export function fetchProducts() {
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            dispatch(setProducts(data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}