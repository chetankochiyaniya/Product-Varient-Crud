import axios from 'axios';
import { ACCESS_TOKEN } from '../Util/constant';

const API_URL = 'http://localhost:5000/api/products';

// Create an Axios instance with base settings
const apiClient = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Function to get the access token (fetch once and reuse)
let accessToken = null;

const getAccessToken = async () => {
    if (!accessToken) {
        // Replace this with the actual logic to fetch your token
        accessToken = localStorage.getItem(ACCESS_TOKEN); // Example: Fetch from local storage
    }
    return accessToken;
};

// Axios request interceptor to attach token
apiClient.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Generalized function to handle API requests
const handleRequest = async (request) => {
    try {
        const response = await request;
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error || 'Something went wrong');
    }
};

// API Functions
const ProductService = {
    getAllProducts: () => handleRequest(apiClient.get('/')),
    getByProductId: (id) => handleRequest(apiClient.get(`/${id}`)),
    createProduct: (product) => handleRequest(apiClient.post('/', product)),
    updateProduct: (id, product) => handleRequest(apiClient.put(`/${id}`, product)),
    deleteProduct: (id) => handleRequest(apiClient.delete(`/${id}`)),
};

export default ProductService;
