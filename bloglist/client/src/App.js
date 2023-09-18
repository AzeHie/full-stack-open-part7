import { useState, useEffect, useRef, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAll, setToken } from './services/blogs';
import { handleLogout } from './services/users';

import NotificationContext from './shared/NotificationContext';

import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import Notification from './shared/Notification';
import Togglable from './shared/Togglable';
import LoginForm from './components/LoginForm';

import './App.css';

const App = () => {
  const blogFormRef = useRef();
  const [user, setUser] = useState();
  const [notification, notificationDispatch] = useContext(NotificationContext);

  // create notification
  const newNotification = (message, styles) => {
    notificationDispatch({ type: 'MESSAGE', payload: message });
    notificationDispatch({ type: 'STYLES', payload: styles });
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' });
    }, 3000);
  };

  // fetch blogs:
  const { data: blogsQuery } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
  });

  const blogs = blogsQuery || [];

  // user already logged in?
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          message={notification.message}
          styles={notification.styles}
        />
        <LoginForm setUser={setUser} newNotification={newNotification} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notification.message}
        styles={notification.styles}
      />
      <span>{user.name} logged in</span>
      <button onClick={() => handleLogout(setUser, newNotification)}>Logout</button>
      <Togglable buttonLabel='Create blog' ref={blogFormRef}>
        <CreateBlog
          newNotification={newNotification}
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          newNotification={newNotification}
        />
      ))}
    </div>
  );
};

export default App;
