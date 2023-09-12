import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getResources = useCallback(async () => {
    const response = await axios.get(baseUrl);
    setResources(response.data);
  }, [baseUrl]);

  const create = async (resource) => {
    await axios.post(baseUrl, resource);
    setResources(resources.concat(resource));
  };

  useEffect(() => {
    getResources();
  }, [getResources]);

  const service = {
    create,
    getResources,
  };

  return [resources, service];
};
