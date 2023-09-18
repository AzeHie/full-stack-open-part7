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
  console.log('in getall: ', request.data);

  return request.data;
};

const createBlog = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

export const editBlog = async (newBlog) => {
  const response = await axios.put(
    `${baseUrl}/${newBlog.id}`,
    newBlog,
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

  const handleCreateBlog = async (newBlog, newNotification, refetchBlogs) => {
    try {
      newBlogMutation.mutate(newBlog);
      refetchBlogs();
      newNotification('New blog created!', 'success');
    } catch (exception) {
      console.log(exception);
      newNotification('Creating a new blog failed!', 'error');
    }
  };

  return { handleCreateBlog };
};

export default BlogMutations;
