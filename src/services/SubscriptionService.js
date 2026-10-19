import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.vITE_API_URL,
    withCredentials: true,
});

export const CreateSubscription = async (subscription) =>{
    const response = await api.post("Subscription", subscription);
    return response.data;
}

export const GetAllSubscriptions = async () =>{
    const response = await api.get("Subscription");
    return response.data;
}

export const GetSubscriptionById = async (id) =>{
    const response = await api.get(`Subscription/${id}`);
    return response.data;
}

export const UpdateSubscription = async (id, subscription) =>{
    const response = await api.put(`Subscription/${id}`, subscription );
    return response.data;
}

export const DeleteSubscription = async (id) =>{
    const response = await api.delete(`Subscription /${id}`);
    return response.data;
}