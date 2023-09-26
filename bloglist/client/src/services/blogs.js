import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const getConfig = () => {
  return {
    headers: { authorization: token },
  };
};

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAll = async () => {
  const request = await axios.get(baseUrl);

  return request.data;
};

const createBlog = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

const editBlog = async (newBlog) => {
  const response = await axios.put(
    `${baseUrl}/${newBlog.id}`,
    newBlog,
    getConfig()
  );
  return response.data;
};

const addComment = async (commentData) => {
  const response = await axios.post(
    `${baseUrl}/${commentData.blogId}/comments`,
    commentData,
    getConfig()
  );
  return response.data;
};

export const removeBlog = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, getConfig());
  return response.data;
};

const BlogMutations = () => {
  const QueryClient = useQueryClient();

  const newBlogMutation = useMutation(createBlog, {
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const newLikeMutation = useMutation(editBlog, {
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const addCommentMutation = useMutation(addComment, {
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const removeBlogMutation = useMutation(removeBlog, {
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const handleCreateBlog = async (newBlog, newNotification) => {
    try {
      newBlogMutation.mutate(newBlog);
      newNotification('New blog created!', 'success');
    } catch (exception) {
      newNotification('Creating a new blog failed!', 'error');
    }
  };

  const handleNewLike = async (newBlog, newNotification) => {
    try {
      newLikeMutation.mutate(newBlog);
    } catch (exception) {
      newNotification('Failed to add new like!', 'error');
    }
  };

  const handleRemove = async (blog, newNotification) => {
    const confirmation = window.confirm(
      `Are you sure you want to remove blog ${blog.title} by ${blog.author}`
    );

    if (confirmation) {
      try {
        removeBlogMutation.mutate(blog.id);
        newNotification('Blog removed Successfully', 'success');
      } catch (exception) {
        newNotification('Removing the blog failed!', 'error');
      }
    }
  };

  const handleNewComment = async (blogId, comment, newNotification) => {
    try {
      addCommentMutation.mutate({ blogId, comment });
    } catch (exception) {
      newNotification('Adding a comment failed!', 'error');
    }
  };

  return { handleCreateBlog, handleNewLike, handleRemove, handleNewComment };
};

export default BlogMutations;
