import React, { useState, useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/planets_form.css';
import icon from '../imgs/icons/icons8-darth-vader-30.png';

export default function PlanetsForm() {
  const { data, selected, setSelected, selectedFilters, setSelectedFilters,
    setSearch, sort, setSort } = useContext(StarWarsContext);

  /* filtra pelo nome do planeta */
  const [inputs, setInputs] = useState({ name: '' });

  const filterData = () => {
    const dataFilter = data.filter((el) => el.name.toUpperCase()
      .includes(inputs.name.toUpperCase()));
    setSearch(dataFilter);
  };

  useEffect(() => {
    filterData();
  }, [inputs.name]);

  const dropFilter = (opcao) => !selectedFilters
    .find((filtro) => opcao === filtro.column);

  return (
    <main className="box_form">
      <label htmlFor="nameFilter">
        <input
          type="text"
          className="nameFilter"
          data-testid="name-filter"
          id="nameFilter"
          name="name"
          placeholder="Encontre um planeta"
          value={ inputs.name }
          onChange={ (e) => { setInputs({ ...inputs, name: e.target.value }); } } // salva os inputs no estado da aplicação
        />
      </label>
      <div className="box_filters">
        <label htmlFor="selectColumn">
          Coluna
          <select
            className="selectColumn"
            data-testid="column-filter"
            id="selectCurrencies"
            name="column"
            value={ selected.column }
            onChange={ (e) => setSelected({ ...selected, column: e.target.value }) }
          >
            {/* <option value="">Selecione</option> */}
            {['population', 'orbital_period', 'diameter',
              'rotation_period', 'surface_water']
              .filter(dropFilter).map((column) => (
                <option value={ column } key={ column }>
                  {column}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="selectComparison">
          Operador
          <select
            className="selectComparison"
            data-testid="comparison-filter"
            id="selectComparison"
            name="comparison"
            value={ selected.comparison }
            onChange={ (e) => setSelected({ ...selected, comparison: e.target.value }) }
          >
            {/* <option value="">Selecione</option> */}
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="inputValue">
          <input
            type="number"
            className="inputValue"
            data-testid="value-filter"
            id="inputValue"
            name="value"
            value={ selected.value }
            onChange={ (e) => setSelected({ ...selected, value: e.target.value }) }
          />
        </label>
        <button
          type="button"
          className="btnFilter"
          data-testid="button-filter"
          onClick={ () => {
            setSelectedFilters([...selectedFilters, selected]);
            setSelected({
              column: 'population',
              comparison: 'maior que',
              value: 0,
            });
          } }
        >
          Filtrar
        </button>
        <button
          type="button"
          className="btnRem"
          data-testid="button-remove-filters"
          onClick={ () => {
            setSelectedFilters([]);
            setSelected({
              column: 'population',
              comparison: 'maior que',
              value: 0,
            });
          } }
        >
          Limpar Filtros
        </button>
        <label htmlFor="sortColumn">
          Ordenar
          <select
            className="sortColumn"
            id="sortColumn"
            data-testid="column-sort"
            name="sort"
            value={ inputs.column }
            onChange={ ({ target }) => setInputs({ ...inputs,
              column: target.value }) }
          >
            {/* <option value="">Selecione</option> */}
            <option value="population">População</option>
            <option value="orbital_period">Período de Órbita</option>
            <option value="diameter">Diâmetro</option>
            <option value="rotation_period">Período de Rotação</option>
            <option value="surface_water">Superfície com Água</option>
          </select>
        </label>
        <div id="radio-container">
          <label htmlFor="ASC">
            Ascendente
            <input
              data-testid="column-sort-input-asc"
              type="radio"
              name="radio"
              className="radio"
              value="ASC"
              id="ASC"
              onChange={ ({ target }) => setInputs({ ...inputs,
                direction: target.value }) }
              checked={ inputs.direction === 'ASC' }
            />
          </label>
          <label htmlFor="DESC">
            Descendente
            <input
              data-testid="column-sort-input-desc"
              type="radio"
              name="radio"
              className="radio"
              value="DESC"
              id="DESC"
              onChange={ ({ target }) => setInputs({ ...inputs,
                direction: target.value }) }
              checked={ inputs.direction === 'DESC' }
            />
          </label>
        </div>
        <button
          type="button"
          className="btnSort"
          data-testid="column-sort-button"
          onClick={ () => setSort({ ...sort,
            direction: inputs.direction,
            column: inputs.column }) }
        >
          Ordenar
        </button>
      </div>
      {selectedFilters.map((filter, index) => (
        <div className="appFilters" key={ index }>
          <button
            type="button"
            className="btnAppFilters"
            onClick={ () => {
              const cloneArray = [...selectedFilters];
              cloneArray.splice(index, 1);
              setSelectedFilters(cloneArray);
            } }
          >
            <img
              src={ icon }
              width="18px"
              alt="excluir"
              name="icon"
            />
            {filter.column}
            +
            {filter.comparison}
            +
            {filter.value}
          </button>
        </div>
      ))}
    </main>
  );
}
