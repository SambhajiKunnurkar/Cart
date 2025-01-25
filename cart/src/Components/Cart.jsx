import React, { useReducer } from 'react';
import './cart.css'



const initialState = [];


function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.findIndex(item => item.id === action.item.id);
      if (existingItemIndex !== -1) {
        return state.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.item, quantity: 1 }];
      }
    }
    case 'REMOVE_FROM_CART': {
      const existingItemIndex = state.findIndex(item => item.id === action.id);
      if (existingItemIndex !== -1) {
        const item = state[existingItemIndex];
        if (item.quantity > 1) {
          
          return state.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return state.filter((_, index) => index !== existingItemIndex);
        }
      }
      return state;
    }
    default:
      return state;
  }
}
function Cart() {
    const [cart, dispatch] = useReducer(cartReducer, initialState);
  
    const addToCart = (item) => {
      dispatch({ type: 'ADD_TO_CART', item });
    };
  
    const removeFromCart = (id) => {
      dispatch({ type: 'REMOVE_FROM_CART', id });
    };
  
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
    return (
      <div>
        <h1>Shopping Cart</h1>
        <h2>Total Price: {totalPrice} RS</h2>       
  
       
        <button onClick={() => addToCart({ id: 1, name: 'Item 1', price: 10 })}>Add Item 1</button>
        <button onClick={() => addToCart({ id: 2, name: 'Item 2', price: 15 })}>Add Item 2</button>
        <button onClick={() => addToCart({ id: 3, name: 'Item 3', price: 20 })}>Add Item 3</button>
        <button onClick={() => addToCart({ id: 4, name: 'Item 4', price: 25 })}>Add Item 4</button>
        <button onClick={() => addToCart({ id: 5, name: 'Item 5', price: 30 })}>Add Item 5</button>
        <button onClick={() => addToCart({ id: 6, name: 'Item 6', price: 35 })}>Add Item 6</button>
        <button onClick={() => addToCart({ id: 7, name: 'Item 7', price: 40 })}>Add Item 7</button>
        <button onClick={() => addToCart({ id: 8, name: 'Item 8', price: 45 })}>Add Item 8</button>
        <button onClick={() => addToCart({ id: 9, name: 'Item 9', price: 50 })}>Add Item 9</button>
        <button onClick={() => addToCart({ id: 10, name: 'Item 10', price: 55 })}>Add Item 10</button>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - RS {item.price} x {item.quantity}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
  
        
      </div>
    );
  }
  
  export default Cart;
  