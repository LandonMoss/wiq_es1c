import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost';

const getTags = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token not found in localStorage");
        }
        const response = await axios.post(`${apiEndpoint}:8002/api/questions/tags`,
            { "token": token });

        return response.data;

    } catch (error) {
        return { error: error.response ? error.response.data.error : error.message };
    }
}

export {getTags}