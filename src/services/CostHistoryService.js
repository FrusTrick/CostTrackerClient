import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.vITE_API_URL,
    withCredentials: true,
});

export const CreateCostHistory = async (costHistory) =>{
    const response = await api.post("CostHistory", costHistory);
    return response.data;
}

export const GetAllCostHistories = async () =>{
    const response = await api.get("CostHistory");
    return response.data;
}

export const GetCostHistoryById = async (id) =>{
    const response = await api.get(`CostHistory/${id}`);
    return response.data;
}

export const UpdateCostHistory = async (id, costHistory) =>{
    const response = await api.put(`CostHistory/${id}`, costHistory );
    return response.data;
}

export const DeleteCostHistory = async (id) =>{
    const response = await api.delete(`CostHistory/${id}`);
    return response.data;
}