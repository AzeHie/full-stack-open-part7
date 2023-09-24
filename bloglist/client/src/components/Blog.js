import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`}>
      <div className='blog__title'>
        {blog.title} by {blog.author}
      </div>
    </Link>
  );
};

export default Blog;
