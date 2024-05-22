import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';

const ShoppingCart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrementQuantity = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      {cartItems.length !== 0 && (
        <div>
          <h1 className="text-3xl font-semibold text-center">Shopping Cart</h1>
          <div className="lg:p-8 md:p-4 p-2 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
            {cartItems.map((item) => (
              <div className="bg-slate-100 shadow-lg rounded-lg p-4 w-full" key={item.id}>
                <h3><strong>Name: </strong>{item.name}</h3>
                <p><strong>Price: </strong>${item.price}</p>
                <div className=' flex flex-row items-center gap-6'>
                  <p><strong>Quantity: </strong></p>
                  <div className="flex items-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-400 text-white px-2 py-1 rounded-l-md"
                      onClick={() => handleDecrementQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="bg-blue-500 hover:bg-blue-400 text-white px-2 py-1 rounded-r-md"
                      onClick={() => handleIncrementQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="bg-red-600 hover:bg-red-500 px-3 py-1 mt-2 rounded-md text-white float-right"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <h3 className="text-center text-3xl p-4">Total Price: <strong>${totalPrice.toFixed(2)}</strong></h3>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
