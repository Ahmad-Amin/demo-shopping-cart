import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProducts } from '../redux/productsSlice';
import ProductItem from './ProductItem';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredItems, status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <p className=' text-center p-4'>Loading...</p>;
  }

  if (status === 'failed') {
    return <p className=' text-center p-4'>{error}</p>;
  }

  return (
    <div className='lg:p-8 md:p-4 p-2 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4'>
      {filteredItems.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
