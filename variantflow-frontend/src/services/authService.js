import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const loginApi = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
};

export default { loginApi };