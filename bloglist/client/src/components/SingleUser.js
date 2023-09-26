import './SingleUser.css';

const SingleUser = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className='SingleUser__container'>
      <h2>{user.name}</h2>
      <ul>
        <h4>Blogs:</h4>
        {user.blogs.map((blog) => (
          <li key={blog.title}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SingleUser;
