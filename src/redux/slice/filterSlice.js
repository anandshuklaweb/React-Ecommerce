import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredProducts: []
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_BY_SEARCH: (state, action) => {
            const { products, search } = action.payload;

            // If the search query is empty, return the original products array
            if (!search) {
                state.filteredProducts = products;
                return;
            }

            const lowerSearch = search.toLowerCase();

            // Memoize the filtered products to avoid redundant computations
            const tempProducts = products.filter((product) => {
                const lowerName = product.name.toLowerCase();
                const lowerCategory = product.category.toLowerCase();
                return lowerName.includes(lowerSearch) || lowerCategory.includes(lowerSearch);
            });

            state.filteredProducts = tempProducts;
        },

        SORT_PRODUCTS: (state, action) => {
            const {products, sort} = action.payload;

            let tempProducts = [];
            if(sort === "latest"){
                tempProducts = products;
            }

            if(sort === "lowest-price"){
                tempProducts = products.slice().sort((a, b) => {
                    return a.price - b.price
                })
            }

            if(sort === "highest-price"){
                tempProducts = products.slice().sort((a, b) => {
                    return b.price - a.price
                })
            }

            if(sort === "a-z"){
                tempProducts = products.slice().sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
            }

            if(sort === "z-a"){
                tempProducts = products.slice().sort((a, b) => {
                    return b.name.localeCompare(a.name)
                })
            }

            state.filteredProducts = tempProducts
        },

        FILTER_BY_CATEGORY : (state, action) => {
            const {products, category} = action.payload;
            let tempProducts = [];
            if(category === "All"){
                tempProducts = products;
            }else{
                tempProducts = products.filter((product) => product.category === category);
            }
            state.filteredProducts = tempProducts;
            
        },

        FILTER_BY_BRAND : (state, action) => {
            const {products, brand} = action.payload;
            let tempProducts = [];
            if(brand === "All"){
                tempProducts = products;
            }else{
                tempProducts = products.filter((product) => product.brand === brand);
            }
            state.filteredProducts = tempProducts;;
        },

        FILTER_BY_PRICE : (state, action) => {
            const {products, price} = action.payload;

            let tempProducts = [];

            tempProducts = products.filter((product) => product.price <= price)

            state.filteredProducts = tempProducts;
        }
    }
})


export const { FILTER_BY_SEARCH, SORT_PRODUCTS, FILTER_BY_CATEGORY, FILTER_BY_BRAND, FILTER_BY_PRICE } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts

export default filterSlice.reducer;