import { Fragment, useContext, useEffect, useState } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import NotificationContext from './shared/NotificationContext';
import UsersContext from './shared/UsersContext';
import { setToken, getAll } from './services/blogs';
import usersService from './services/users';

import CreateBlog from './components/CreateBlog';
import Notification from './shared/Notification';
import UsersList from './components/UsersList';
import SingleUser from './components/SingleUser';
import SingleBlog from './components/SingleBlog';
import BlogsList from './components/BlogsList';
import LoginForm from './components/LoginForm';
import MainNavigation from './components/MainNavigation';

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

  // fetch blogs
  const { data: blogsQuery } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
  });

  const blogs = blogsQuery || [];

  const userMatch = useMatch('/users/:id');
  const matchingUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch('/blogs/:id');
  const matchingBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const routes = (
    <Routes>
      <Route
        path='/'
        element={
          <BlogsList
            blogs={blogs}
            newNotification={newNotification}
            user={user}
          />
        }
      />
      <Route
        path='/createblog'
        element={<CreateBlog newNotification={newNotification} />}
      />
      <Route
        path='/blogs/:id'
        element={<SingleBlog blog={matchingBlog} user={user} />}
      />
      <Route path='/users' element={<UsersList users={users} />} />
      <Route path='/users/:id' element={<SingleUser user={matchingUser} />} />
    </Routes>
  );

  return (
    <Fragment>
      <MainNavigation
        user={user}
        newNotification={newNotification}
        userDispatch={userDispatch}
      />
      <h2>blogs</h2>
      <Notification
        message={notification.message}
        styles={notification.styles}
      />
      {!user && (
        <div>
          <h2>Log in to application</h2>
          <LoginForm
            userDispatch={userDispatch}
            newNotification={newNotification}
          />
        </div>
      )}
      <main>{routes}</main>
    </Fragment>
  );
};

export default App;
