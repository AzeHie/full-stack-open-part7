import Blog from '../components/Blog';

const BlogsList = ({ blogs, newNotification, user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2 style={{ color: 'darkblue' }}>List of blogs:</h2>
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

export default BlogsList;
