import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  status: 'idle' | 'loading' | 'failed';
  searchTerm: string;
  filterCategory: string;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  status: 'idle',
  searchTerm: '',
  filterCategory: '',
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://gist.githubusercontent.com/Ahmad-Amin/00cbff08593eec5800b8b6203c339bfb/raw/e1a03c794d7a43a4718394740554401ff14ca78a/products.json');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch products. Please try again later.');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.filteredItems = state.items.filter((product) =>
        product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
    setFilterCategory(state, action: PayloadAction<string>) {
      state.filterCategory = action.payload;
      if (state.filterCategory) {
        state.filteredItems = state.items.filter((product) =>
          product.category === state.filterCategory
        );
      } else {
        state.filteredItems = state.items;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setSearchTerm, setFilterCategory } = productsSlice.actions;

export default productsSlice.reducer;
