import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import requestAPIFetch from '../services/RequestAPI';

function StarWarsProvider({ children }) {
  /* recebe os valores da API */
  const [data, setData] = useState([]);

  /* para pegar os filtros do PlanetsForm e salvar no contexto */
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  /* pega os filtros (coluna, <=>, valor) selecionados */
  const [selectedFilters, setSelectedFilters] = useState([]);

  /* para pegar os filtros de ordenação */
  const [sort, setSort] = useState({
    column: 'population',
    direction: 'ASC',
  });

  /* contem o resultado da pesquisa por nome */
  const [search, setSearch] = useState([]);

  useEffect(() => {
    requestAPIFetch().then((result) => {
      setData(result);
      setSearch(result);
    });
  }, []);

  const value = useMemo(() => ({
    data,
    selected,
    setSelected,
    search,
    setSearch,
    sort,
    setSort,
    selectedFilters,
    setSelectedFilters,
  }), [data, selected, setSelected, search, setSearch,
    sort, setSort, selectedFilters, setSelectedFilters]);

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
