import BlogMutations from '../services/blogs';

const SingleBlog = ({ blog, user, newNotification }) => {
  if (!blog) {
    return <div>Blog not found with specified id..</div>;
  }

  const { handleNewLike, handleRemove } = BlogMutations();

  const newLike = () => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };

    handleNewLike(newBlog, newNotification);
  };

  const removeBlog = () => {
    handleRemove(blog, newNotification);
  };

  const removeBtn =
    blog.user.username === user.username ? (
      <button className='blog__remove-button' onClick={removeBlog}>
        Remove
      </button>
    ) : null;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>
        likes: {blog.likes} <button onClick={newLike}>Like</button>
      </p>
      <p>Added by {blog.author}</p>
      {removeBtn}
    </div>
  );
};

export default SingleBlog;
