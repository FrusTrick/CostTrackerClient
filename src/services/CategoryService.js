import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.vITE_API_URL,
    withCredentials: true,
});

export const CreateCategory = async (category) =>{
    const response = await api.post("Category", category);
    return response.data;
}

export const GetAllCategories = async () =>{
    const response = await api.get("Category");
    return response.data;
}

export const GetCategoryById = async (id) =>{
    const response = await api.get(`Category/${id}`);
    return response.data;
}

export const UpdateCategory = async (id, category) =>{
    const response = await api.put(`Category/${id}`, category);
    return response.data;
}

export const DeleteCategory = async (id) =>{
    const response = await api.delete(`Category/${id}`);
    return response.data;
}
