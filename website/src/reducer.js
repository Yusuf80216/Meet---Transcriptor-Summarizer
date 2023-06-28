import { useReducer } from "react";

const initialState = 0;
const reducer = (state , action)=>{ 
// always return something in this function
// ALWAYYYYYYYYYYYYYS RETURN IN ANY FUNCTION , IF's statements and etc.
    console.log(state , action);
    if(action.type === "GET_TRANSCRIPT"){
       return{
            ...state,
            transcript : action.payload  // this transcript we hve accessed from context.js initialState
       }
    }

    else{

        return state;
    }

}

export default reducer;