import axios from 'axios';
import { setToken } from './blogs';

const baseUrl = '/api/login';

const login = async (username, password) => {
  const res = await axios.post(baseUrl, { username, password });
  return res.data;
};

export default { login };

export const handleLogin = async (
  username,
  password,
  userDispatch,
  newNotification
) => {
  try {
    const userLogin = await login(username, password);

    localStorage.setItem('loggedUser', JSON.stringify(userLogin));

    setToken(userLogin.token);
    userDispatch({ type: 'LOGIN', payload: userLogin });
    newNotification('Logged in!', 'success');
  } catch (exception) {
    newNotification('Failed to log in!', 'error');
  }
};

export const handleLogout = (userDispatch, newNotification) => {
  userDispatch({ type: 'LOGOUT' });
  localStorage.removeItem('loggedUser');
  newNotification('Logged out!', 'success');
};
