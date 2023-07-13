import React, { useEffect, useState } from 'react'
// to use the actions , useDispatch is used.
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../store/cartSlice';
import { fetchProducts } from '../store/productSlice';

const Products = () => {
    const dispatch = useDispatch();
    const {data : products, status} = useSelector((state)=>state.product)
    // const [products , setProducts ] = useState([]);
    useEffect(()=>{
        dispatch(fetchProducts())
        // const fetchProducts = async ()=>{
        //     const response = await fetch('https://fakestoreapi.com/products')
        //     const data = await response.json()
        //     console.log(data);
        //     setProducts(data);
        // }
        // fetchProducts()
    },[])
    // #EAEDED

    const handleAdd = (product)=>{
        // dispatch is used to place that function when we do something 
        // and inside that we pass : action 
        // so syntax , dispatch(action);

        dispatch(add(product))
    
    }

  return (
    <>
        <div className='productsWrapper px-7'>
            {
                products.map((currentElem)=>{
                    return(
                        <>
                        <div className="card " key={products.id}>
                            <img src={currentElem.image} alt="" className='h-[80px] mx-auto'/>
                            <h4>{currentElem.title}</h4>
                            <h5>{currentElem.price}</h5>
                            <button onClick={()=>handleAdd(currentElem)} className='p-3 bg-yellow-200 rounded-md hover:bg-yellow-500'>Add to Cart</button>
                        </div>
                        </>
                    )
                })
            }
        </div>
    </>
  )
}

export default Products