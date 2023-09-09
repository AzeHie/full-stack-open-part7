import axios from 'axios';
import { useEffect, useState } from 'react';

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      if (name) {
        try {
          const response = await axios.get(
            `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
          );
          setCountry({ data: response.data, found: true });
        } catch (err) {
          if(err.response.data.error === "not found") {
            setCountry({ data: null, found: false});
          } else {
            // handle error
            console.log(err);
          }
        }
      }
    };
    fetchCountry();
  }, [name]);

  return country;
};
