import { Fragment, useState } from 'react';

import './Blog.css';
import BlogMutations from '../services/blogs';

const Blog = ({ blog, user, newNotification }) => {
  const [showDetails, setShowDetails] = useState(false);

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
    <Fragment>
      {!showDetails && (
        <div className='blog__title'>
          {blog.title} by {blog.author}
          <button
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            View
          </button>
        </div>
      )}
      {showDetails && (
        <div className='blog__all-details'>
          <span>
            Title: {blog.title}
            <button
              onClick={() => {
                setShowDetails(!showDetails);
              }}
            >
              hide
            </button>
          </span>
          <span>Url: {blog.url}</span>
          <span className="blog__likes">
            Likes: {blog.likes}
            <button onClick={newLike}>like</button>
          </span>
          <span>Author: {blog.author}</span>
          {removeBtn}
        </div>
      )}
    </Fragment>
  );
};

export default Blog;
