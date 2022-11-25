import React, { useEffect, useState, useMemo } from 'react';
import StarWarsContext from './StarWarsContext';
import requestAPIFetch from '../services/RequestAPI';

export default function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    requestAPIFetch().then((result) => setData(result));
  }, []);

  const value = useMemo(() => ({
    data,
  }), [data]);

  return (
    <StarWarsContext.Provider value={ data }>
      { children }
    </StarWarsContext.Provider>
  );
}
