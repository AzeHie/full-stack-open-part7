import axios from 'axios';
import blogService from './blogs';

const baseUrl = '/api/login';

const login = async (username, password) => {

  const res = await axios.post(baseUrl, { username, password });
  return res.data;
};

export default { login };


export const handleLogin = async (username, password, setUser, newNotification) => {
  try {
    const userLogin = await login(username, password);

    localStorage.setItem('loggedUser', JSON.stringify(userLogin));

    blogService.setToken(userLogin.token);
    setUser(userLogin);
    newNotification('Logged in!', 'success');
  } catch (exception) {
    newNotification('Failed to log in!', 'error');
  }
};

export const handleLogout = (setUser, newNotification) => {
  setUser(null);
  localStorage.removeItem('loggedUser');
  newNotification('Logged out!', 'success');
};

