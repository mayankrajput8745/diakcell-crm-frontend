import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialState from './initialState';
import { GET_PRODUCTS, GET_PRODUCT_BY_ID, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './api';
import { METHOD_TYPES } from "../../utils/constants";
import { fetchDataAndProceedWithToolkit } from "../../utils/api";

// Async actions - MUST be defined BEFORE the slice
export const getProducts = createAsyncThunk(
    'product/getProducts', // Unique action name
    async (params = {}, helpers) => fetchDataAndProceedWithToolkit(
        {
            url: GET_PRODUCTS,
            method: METHOD_TYPES.GET,
            params,
        },
        helpers
    )
);

export const getProductById = createAsyncThunk(
    'product/getProductById', // Unique action name
    async (id, helpers) => fetchDataAndProceedWithToolkit(
        {
            url: GET_PRODUCT_BY_ID.replace(':id', id),
            method: METHOD_TYPES.GET,
        },
        helpers
    )
);

export const createProduct = createAsyncThunk(
    'product/createProduct', // Unique action name
    async (data, helpers) => fetchDataAndProceedWithToolkit(
        {
            url: CREATE_PRODUCT,
            method: METHOD_TYPES.POST,
            data,
        },
        helpers
    )
);

export const updateProduct = createAsyncThunk(
    'product/updateProduct', // Unique action name
    async ({ id, data }, helpers) => fetchDataAndProceedWithToolkit(
        {
            url: UPDATE_PRODUCT.replace(':id', id),
            method: METHOD_TYPES.PUT,
            data,
        },
        helpers
    )
);

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct', // Unique action name
    async (id, helpers) => fetchDataAndProceedWithToolkit(
        {
            url: DELETE_PRODUCT.replace(':id', id),
            method: METHOD_TYPES.DELETE,
        },
        helpers
    )
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        updateProductState(state, action) {
            return { ...state, ...action.payload };
        },
        clearProductState() {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Products
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data || [];
                state.pagination = {
                    current: action.payload.pagination?.page || 1,
                    pageSize: action.payload.pagination?.limit || 10,
                    total: action.payload.pagination?.total || 0
                };
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Product by ID
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProduct = action.payload.data;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.unshift(action.payload.data);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(p => p.id === action.payload.data.id);
                if (index !== -1) {
                    state.products[index] = action.payload.data;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(p => p.id !== action.meta.arg);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { updateProductState, clearProductState } = productSlice.actions;
export default productSlice.reducer;