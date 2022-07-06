import React, { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import Navbar from './Components/Navbar';
import CartContainer from './Components/CartContainer';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import Modal from './Components/Modal';

const App = () => {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems('Text pass as an argument of cartSlice async function'));
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
      <main>
        {isOpen && <Modal/>}
        <Navbar/>
        <CartContainer/>
      </main>
  );
};

export default App;
