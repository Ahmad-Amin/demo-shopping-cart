import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilterCategory } from '../redux/productsSlice';

const Filter: React.FC = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterCategory(event.target.value));
  };

  return (
    <>
      <select onChange={handleFilterChange} id="countries" className=" cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
        <option value="">All Categories</option>
        <option value="Category A">Category A</option>
        <option value="Category B">Category B</option>
        <option value="Category C">Category C</option>
      </select>
    </>

  );
};

export default Filter;
