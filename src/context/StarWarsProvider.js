import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import requestAPIFetch from '../services/RequestAPI';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({}); /* para pegar os filtros do PlanetsForm e salvar no contexto */
  const [search, setSearch] = useState([]); /* contem o resultado da pesquisa por nome */

  useEffect(() => {
    requestAPIFetch().then((result) => {
      setData(result);
      setSearch(result);
    });
  }, []);

  const value = useMemo(() => ({
    data,
    filters,
    setFilters,
    search,
    setSearch,
  }), [data, filters, setFilters, search, setSearch]);

  return (
    <StarWarsContext.Provider value={ value }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default StarWarsProvider;
