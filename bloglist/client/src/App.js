import { useState, useEffect, useRef, useContext } from 'react';

import Blog from './components/Blog';
import blogService from './services/blogs';
import userService from './services/users';
import NotificationContext from './shared/NotificationContext';

import CreateBlog from './components/CreateBlog';
import Notification from './shared/Notification';
import Togglable from './shared/Togglable';
import './App.css';

const App = () => {
  const blogFormRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const newNotification = (message, styles) => {
    notificationDispatch({ type: 'MESSAGE', payload: message });
    notificationDispatch({ type: 'STYLES', payload: styles });
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' });
    }, 3000);
  };

  const fetchBlogs = async () => {
    const loadedBlogs = await blogService.getAll();

    loadedBlogs.sort((a, b) => b.likes - a.likes);

    setBlogs(loadedBlogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userLogin = await userService.login(username, password);

      localStorage.setItem('loggedUser', JSON.stringify(userLogin));

      blogService.setToken(userLogin.token);
      setUser(userLogin);
      newNotification(
        'Logged in!',
        'success',
      );
      setPassword('');
      setUsername('');
    } catch (exception) {
      newNotification(
        'Failed to log in!',
        'error',
      );
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedUser');
    newNotification('Logged out!', 'success');
  };

  const handleNewLike = async (blog) => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };

    try {
      await blogService.editBlog(newBlog);
      fetchBlogs();
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
        fetchBlogs();
      } catch (exception) {
        newNotification('Removing the blog failed!', 'error');
      }
    }
  };

  const handleCreateBlog = async (newBlog) => {
    try {
      await blogService.createBlog(newBlog);
      fetchBlogs();
      newNotification('New blog created!', 'success');
    } catch (exception) {
      console.log(exception);
      newNotification('Creating a new blog failed!', 'error');
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
        <form onSubmit={handleLogin}>
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
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} styles={notification.styles} />
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>Logout</button>
      <Togglable buttonLabel='Create blog' ref={blogFormRef}>
        <CreateBlog
          handleCreateBlog={handleCreateBlog}
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
