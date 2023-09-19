import { Fragment, useState } from 'react';
import { handleLogin } from '../services/users';

const LoginForm = ({ userDispatch, newNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (event) => {
    event.preventDefault();

    handleLogin(username, password, userDispatch, newNotification);
  };

  return (
    <Fragment>
      <form onSubmit={login}>
        <div className='login__inputs'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            value={username}
            name='username'
            id='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='login__inputs'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            value={password}
            name='password'
            id='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' id='login-button'>
          Login
        </button>
      </form>
    </Fragment>
  );
};

export default LoginForm;
