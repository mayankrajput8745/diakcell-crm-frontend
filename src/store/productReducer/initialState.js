const initialState = {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0
    }
};

export default initialState;