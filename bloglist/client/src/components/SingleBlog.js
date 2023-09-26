import { Fragment, useContext, useState } from 'react';
import BlogMutations from '../services/blogs';
import UsersContext from '../shared/UsersContext';

const SingleBlog = ({ blog, newNotification }) => {
  const [user] = useContext(UsersContext);
  const [comment, setComment] = useState('');

  console.log(blog, newNotification);

  if (!blog) {
    return <div>Blog not found with specified id..</div>;
  }

  const { handleNewLike, handleRemove, handleNewComment } = BlogMutations();

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

  const addComment = (e) => {
    e.preventDefault();

    handleNewComment(blog.id, comment, newNotification);
  };

  const removeBtn =
    blog.user.username === user.username ? (
      <button className='blog__remove-button' onClick={removeBlog}>
        Remove
      </button>
    ) : null;

  return (
    <Fragment>
      <div>
        <h2>{blog.title}</h2>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes} <button onClick={newLike}>Like</button>
        </p>
        <p>Added by {blog.author}</p>
        {removeBtn}
      </div>
      <div>
        <h4>Comments:</h4>
        {blog.comments && (blog.comments.length > 0) ? (
          blog.comments.map((comment) => <p key={comment}>{comment}</p>)
        ) : (
          <p>No comments added yet.. </p>
        )}
        <form onSubmit={addComment}>
          <input
            type='text'
            name='comment'
            id='name'
            onChange={({ target }) => setComment(target.value)}
          />
          <button type='submit'>Add comment</button>
        </form>
      </div>
    </Fragment>
  );
};

export default SingleBlog;
