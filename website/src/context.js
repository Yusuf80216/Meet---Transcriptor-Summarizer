// create a context (Warehouse) which contain .provider and .consumer
// provider
// consumer /useContext()
// children means our full application lies here.
import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import reducer from './reducer';

const AppContext = createContext();

// const TranscriptAPI = "https://jsonplaceholder.typicode.com/todos/"

const initialState = {
    transcript : {},
}

const AppProvider = ({children})=>{

    const [ state , dispatch]= useReducer(reducer , initialState);

    // const getTranscript= async(url,formData)=>{
    const getTranscript= async(formData)=>{
        try {
            const response = await axios.post("http://7bfa-35-245-95-245.ngrok.io/video", formData);
            let data = await response.data;
            // console.log('DATA AAYA RE',data);
            dispatch({type : "GET_TRANSCRIPT",payload: data})
        } catch (error) {
            console.error(error);
        }
            // now after apicall and data fetching
            // dispatch({type , payload:data}) payload contains the data. and type tells what the dataAction is .

            
    }


    useEffect(()=>{
        // getTranscript(TranscriptAPI)
        getTranscript()
    },[])






    return (
        <AppContext.Provider value={{...state, getTranscript}}> { children } </AppContext.Provider>
    )
};

// Custom Global Hook creation.

// const useGlobalContext = ()=>{
//     return useContext(AppContext);
// }


export {AppProvider , AppContext};
// export {AppProvider , AppContext ,useGlobalContext };