import React from 'react';
import ProductList from './components/ProductList';
import Filter from './components/Filter';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';

const App: React.FC = () => {
  return (
    <div>
      <h1 className=' text-3xl text-center font-semibold my-6'>Product Listing</h1>
      <div className=' flex md:flex-row flex-col justify-center items-center gap-3'>
        <Search />
        <Filter />
      </div>
      <ProductList />
      <ShoppingCart />
    </div>
  );
};

export default App;
