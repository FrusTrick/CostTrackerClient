
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export async function LoginWithCookie(email, password) {
  await api.post('login?useCookies=true', { email, password });
}


console.log('Configured API URL:', api.defaults.baseURL);

export async function checkAuthentication() {
  try {
    const response = await api.get('Auth/GetUserRole');

    if (response.data === false || response.data == null) {
      return false;
    }

    return response.data;
  } catch (error) {
    if (
      error.response?.status === 401 ||
      error.response?.status === 404
    ) {
      return false;
    }

    console.error('Authentication check failed:', error);
    return false;
  }
}

export async function Logout() {
  try {
    const response = await api.post('auth/LogOut');
    return response.status === 200;
  } catch (error) {
    if (error.response?.status === 401) {
      return false;
    }

    console.error('Logout failed:', error);
    return false;
  }
}
