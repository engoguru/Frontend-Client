import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products with filters and pagination
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/productList/search', {
        params: {
          query: params.search || '',
          productName: params.productName,
          productBrand: params.productBrand,
          productCategory: params.productCategory,
          productTags: params.productTags,
          servingSize: params.servingSize,
          weight: params.weight,
          material: params.material,
          gender: params.gender,
          fit: params.fit,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          color: params.color,
          page: params.page || 1,
          limit: params.limit || 10,
          sort:params.sort,
          subCategory:params.subCategory
        },
      });

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);

// Async thunk to fetch products with filters and pagination
export const fetchNutritionProducts = createAsyncThunk(
  'products/fetchNutrition',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/productList/search', {
        params: {
          query: params.search || '',
          productName: params.productName,
          productBrand: params.productBrand,
          productCategory: params.productCategory,
          productTags: params.productTags,
          servingSize: params.servingSize,
          weight: params.weight,
          material: params.material,
          gender: params.gender,
          fit: params.fit,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          color: params.color,
          page: params.page || 1,
          limit: params.limit || 10,
          sort:params.sort
        },
      });

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);



// Async thunk to fetch products with filters and pagination
export const fetchApparelProducts = createAsyncThunk(
  'products/fetchApparel',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/productList/search', {
      params: {
          query: params.search || '',
          productName: params.productName,
          productBrand: params.productBrand,
          productCategory: params.productCategory,
          productTags: params.productTags,
          servingSize: params.servingSize,
          weight: params.weight,
          material: params.material,
          gender: params.gender,
          fit: params.fit,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          color: params.color,
          page: params.page || 1,
          limit: params.limit || 10,
          sort:params.sort
        },
      });

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);



// Async thunk to fetch products with filters and pagination
export const fetchEquipmentProducts = createAsyncThunk(
  'products/fetchEquipment',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/productList/search', {
         params: {
          query: params.search || '',
          productName: params.productName,
          productBrand: params.productBrand,
          productCategory: params.productCategory,
          productTags: params.productTags,
          servingSize: params.servingSize,
          weight: params.weight,
          material: params.material,
          gender: params.gender,
          fit: params.fit,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          color: params.color,
          page: params.page || 1,
          limit: params.limit || 10,
          sort:params.sort
        },
      });

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);



// findOne witg id 

export const fetchSingleProduct=createAsyncThunk(
  'product/fetchSingleProduct',
  async(id,thunkAPI)=>{
    try {
        const response = await axios.get(`http://localhost:5000/api/products/productList//GetOne/${id}`);
         return response.data;
    } catch (error) {
        
       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
)

// fetch related products by category
export const fetchRelatedProducts=createAsyncThunk(
  'product/fetchRelatedProducts',
  async(category,thunkAPI)=>{
    try {
        const response = await axios.get(`http://localhost:5000/api/products/productList/relevantProducts/${category}`);
         return response.data;
    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
)

// Initial state
const initialState = {
  products: [],
  nutritionProducts:[],
  apparelProducts:[],
  equipmentProducts:[],
  singleProduct:null,
  relatedProducts:[],

  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  totalPages: 1,
};

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductInfo(state) {
      state.products = [];
      state.totalCount = 0;
      state.currentPage = 1;
      state.totalPages = 1;
    }
  },
  extraReducers: (builder) => {
    builder
    // all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalCount = action.payload.totalCount;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



          // all nuttrion products
      .addCase(fetchNutritionProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNutritionProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.nutritionProducts = action.payload.products;
     
      })
      .addCase(fetchNutritionProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


                // all apparel products
      .addCase(fetchApparelProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApparelProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.apparelProducts = action.payload.products;
    
      })
      .addCase(fetchApparelProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

                   // all equipment products
      .addCase(fetchEquipmentProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEquipmentProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.equipmentProducts = action.payload.products;
        
      })
      .addCase(fetchEquipmentProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      // get single product
          .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload.data;
        
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

            // Related product
          .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload.relevantProducts;
        
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearProductInfo } = productSlice.actions;
export default productSlice.reducer;
