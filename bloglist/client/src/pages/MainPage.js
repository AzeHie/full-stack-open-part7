import { useQuery } from '@tanstack/react-query';

import { getAll } from '../services/blogs';

import Blog from '../components/Blog';
import LoginForm from '../components/LoginForm';



const MainPage = ({ newNotification, user, userDispatch }) => {

  // fetch blogs:
  const { data: blogsQuery } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
  });

  const blogs = blogsQuery || [];

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          userDispatch={userDispatch}
          newNotification={newNotification}
        />
      </div>
    );
  }

  return (
    <div>
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

export default MainPage;
