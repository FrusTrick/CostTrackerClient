import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export async function LoginWithCookie(email, password){
    await api.post("login?useCookies=true", { email, password });
}

export async function checkAuthentication(){
    try{
        await api.get("manage/info");
        return true;
    }
    catch(error){
        if(error.response.status === 401){
            return false;
        }
    }
}