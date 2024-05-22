import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/cartSlice';

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
  };
}

const ProductItem: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const isProductInCart = cartItems.some(item => item.id === product.id);

  return (
    <div className=''>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <div>
            <div className='flex justify-between'>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
              <div>
                <span className='bg-slate-600 text-white rounded-2xl text-xs font-semibold px-3 py-1'>{product.category}</span>
              </div>
            </div>
            <p className='text-gray-700 text-sm'>{product.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
            {isProductInCart ? (
              <button disabled className="text-white cursor-not-allowed bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Added</button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
