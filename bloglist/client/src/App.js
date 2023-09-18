import { useState, useEffect, useRef, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import blogService, { getAll, setToken } from './services/blogs';
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
  const { data: blogsQuery, refetch: refetchBlogs } = useQuery({
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

  const handleNewLike = async (blog) => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };

    try {
      await blogService.editBlog(newBlog);
      refetchBlogs();
    } catch (exception) {
      newNotification('Failed to add new like!', 'error');
    }
  };

  const handleRemove = async (blog) => {
    const confirmation = window.confirm(
      `Are you sure you want to remove blog ${blog.title} by ${blog.author}`
    );

    if (confirmation) {
      try {
        await blogService.removeBlog(blog.id);
        newNotification('Blog removed Successfully', 'success');
        refetchBlogs();
      } catch (exception) {
        newNotification('Removing the blog failed!', 'error');
      }
    }
  };

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
          refetchBlogs={refetchBlogs}
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleRemove={handleRemove}
          handleNewLike={handleNewLike}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
