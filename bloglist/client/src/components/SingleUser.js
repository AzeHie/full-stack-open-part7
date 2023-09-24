const SingleUser = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.title}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SingleUser;
