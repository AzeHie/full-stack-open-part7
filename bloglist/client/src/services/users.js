import axios from 'axios';
import { setToken } from './blogs';

const loginUrl = '/api/login';
const usersUrl = '/api/users';

const login = async (username, password) => {
  const res = await axios.post(loginUrl, { username, password });
  return res.data;
};

const fetchUsers = async () => {
  const res = await axios.get(usersUrl);
  return res.data;
};

export default { login, fetchUsers };

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
