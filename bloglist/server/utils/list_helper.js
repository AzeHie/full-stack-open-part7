const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (previous, currentBlog) => {
    return previous.likes >= currentBlog.likes ? previous : currentBlog;
  };

  const blogWithMostLikes = blogs.reduce(reducer, 0);

  return blogWithMostLikes ? blogWithMostLikes : 0;
};

const mostBlogs = (blogs) => {
  if (blogs.length < 1) {
    return null;
  }

  const blogsByAuthor = _.countBy(blogs, 'author'); // returns objects with key-value pairs

  const result = Object.entries(blogsByAuthor).reduce(
    // converts blogsByAuthor to an array, then calls reduce on it
    (authorWithMost, [author, blogCount]) => {
      if (blogCount > authorWithMost.blogCount) {
        return { author, blogCount };
      }
      return authorWithMost;
    },
    { author: '', blogCount: 0 }
  );

  return result;
};

const mostLikes = (blogs) => {
  if (blogs.length < 1) {
    return null;
  }

  const blogsByAuthor = _.groupBy(blogs, 'author');

  const authorTotalLikes = Object.entries(blogsByAuthor).map(
    ([author, blogs]) => {
      return {
        author,
        totalLikes: blogs.reduce((sum, blog) => {
          return sum + blog.likes;
        }, 0),
      };
    }
  );

  const authorWithMostLikes = authorTotalLikes.reduce(
    (authorWithMost, { author, totalLikes }) => {
      if (authorWithMost.totalLikes < totalLikes) {
        return { author, totalLikes };
      }
      return authorWithMost;
    },
    { author: '', totalLikes: 0 }
  );

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
