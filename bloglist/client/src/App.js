import { Fragment, useContext, useEffect, useState } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';

import NotificationContext from './shared/NotificationContext';
import UsersContext from './shared/UsersContext';
import { setToken } from './services/blogs';
import { handleLogout } from './services/users';
import usersService from './services/users';

import CreateBlog from './components/CreateBlog';
import Notification from './shared/Notification';
import UsersList from './components/UsersList';
import SingleUser from './components/SingleUser';
import MainPage from './pages/MainPage';

const App = () => {
  const [user, userDispatch] = useContext(UsersContext);
  const [users, setUsers] = useState([]);

  const [notification, notificationDispatch] = useContext(NotificationContext);

  // create notification
  const newNotification = (message, styles) => {
    notificationDispatch({ type: 'MESSAGE', payload: message });
    notificationDispatch({ type: 'STYLES', payload: styles });
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' });
    }, 3000);
  };

  useEffect(() => {
    // already logged in?
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'LOGIN', payload: user });
      setToken(user.token);
    }

    // fetch all users
    const loadUsers = async () => {
      const usersData = await usersService.fetchUsers();
      setUsers(usersData);
    };

    loadUsers();
  }, []);

  const match = useMatch('/users/:id');
  const userMatch = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  const routes = (
    <Routes>
      <Route
        path='/'
        element={
          <MainPage
            newNotification={newNotification}
            user={user}
            userDispatch={userDispatch}
          />
        }
      />
      <Route
        path='/createblog'
        element={<CreateBlog newNotification={newNotification} />}
      />
      <Route path='/users' element={<UsersList users={users} />} />
      <Route path='/users/:id' element={<SingleUser user={userMatch} />} />
    </Routes>
  );

  return (
    <Fragment>
      <h2>blogs</h2>
      <Notification
        message={notification.message}
        styles={notification.styles}
      />
      {user && (
        <div>
          <span>{user.name} logged in</span>
          <br />
          <button onClick={() => handleLogout(userDispatch, newNotification)}>
            Logout
          </button>
        </div>
      )}

      <main>{routes}</main>
    </Fragment>
  );
};

export default App;
