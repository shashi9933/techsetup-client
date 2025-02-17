const API_URL = import.meta.env.VITE_API_URL || 'https://appar-server.onrender.com';
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || 'https://appar-client.vercel.app';

export const api = {
    get: async (endpoint) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },

    post: async (endpoint, data) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },

    put: async (endpoint, data) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },

    delete: async (endpoint) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }
};

export { CLIENT_URL };
export default api;
