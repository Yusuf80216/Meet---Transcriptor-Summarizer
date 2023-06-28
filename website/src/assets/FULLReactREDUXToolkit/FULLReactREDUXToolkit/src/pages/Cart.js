import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove } from '../store/cartSlice';


const Cart = () => {
  const products = useSelector((state)=>state.cart);
  const dispatch = useDispatch()
  const handleRemove = (productId)=>{
      dispatch(remove(productId))
  }
  console.log('PRODUCTS ', products.length);
  return (
    <>
      <div className='p-4'>
        <h1 className='text-3xl'>{products.length < 1 ? 'Your Cart is Empty' : 'Your Cart : '}</h1>
        <div className='cartWrapper'>
            {
                  products.map((product)=>{
                  return(
                    <>
                      <div className='cartCard'>
                          <img src={product.image} alt="" className='h-[80px]' />
                          <h5>{product.title}</h5>
                          <h5>{product.price}</h5>
                          <button onClick={()=>handleRemove(product.id)} className='btn'>Remove</button>
                      </div>
                    </>
                  )
                })
                
            }
        </div>
      </div>
    </>
  )
}

export default Cart