import React from 'react'
import { useLocation } from 'react-router';
import ImageViewer from './components/ImageViewer'

const NextPage = () => {
    
    return(
        <>
            <h1 className='text-white'>Nextpage</h1>
        </>
    )

  
}

export default NextPage



//     const location = useLocation();
//     const myProp = location.state?.myProp;
//   return (
//     <>
//     <h1>{myProp}</h1>
//     {
//         myProp.map((data)=>{
//             console.log('nextpage',data);
//             return(
//                 <>
//                     <img src={data} alt="" className='w-40'/>
//                 </>
//             )
//         })
//     }
//     </>