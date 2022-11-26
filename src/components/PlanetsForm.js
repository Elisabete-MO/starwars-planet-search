import React, { useState, useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/planets_form.css';
import icon from '../imgs/icons/icons8-darth-vader-30.png';

export default function PlanetsForm() {
  const { data, filters, setFilters, setSearch } = useContext(StarWarsContext);

  const [inputs, setInputs] = useState({
    name: '',
    column: '',
    comparison: '',
    value: 0,
    sort: '',
    radio: 'ASC',
    var: true,
  });

  // salva os inputs no estado da aplicação
  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
    setFilters({ ...filters, [target.name]: target.value });
  };

  const filterData = () => {
    const dataFilter = data.filter((el) => el.name.toUpperCase()
      .includes(filters.name.toUpperCase()));
    setSearch(dataFilter);
  };

  // salva os valores de filtros no contexto para depois serem apresentados e usados como filtros e texto
  useEffect(() => {
    filterData();
  }, [inputs]);

  const appFilters = () => {
    setInputs({ ...inputs, var: false });
  };

  const removeFilter = () => {
    setFilters({ name: '',
      column: '',
      comparison: '',
      value: 0,
      sort: '',
      radio: 'ASC',
    });
    setInputs({ ...inputs, var: true });
  };
  // clearData = () => {
  //   this.setState({
  //     value: '',
  //     currency: 'USD',
  //     method: 'Cartão de débito',
  //     tag: 'Alimentação',
  //     description: '',
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
          onChange={ handleChange }
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
            value={ inputs.column }
            onChange={ handleChange }
          >
            <option value="">Selecione</option>
            <option value="population">População</option>
            <option value="orbital_period">Período de Órbita</option>
            <option value="diameter">Diâmetro</option>
            <option value="rotation_period">Período de Rotação</option>
            <option value="surface_water">Superfície com Água</option>
          </select>
        </label>
        <label htmlFor="selectComparison">
          Operador
          <select
            className="selectComparison"
            data-testid="comparison-filter"
            id="selectComparison"
            name="comparison"
            value={ inputs.comparison }
            onChange={ handleChange }
          >
            <option value="">Selecione</option>
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
            value={ inputs.value }
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          className="btnFilter"
          data-testid="button-filter"
          onClick={ appFilters }
        >
          Filtrar
        </button>
        <label htmlFor="sortColumn">
          Ordenar
          <select
            className="sortColumn"
            id="sortColumn"
            data-testid="column-sort"
            name="sort"
            value={ inputs.sort }
            onChange={ handleChange }
          >
            <option value="">Selecione</option>
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
              onChange={ handleChange }
              checked
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
              onChange={ handleChange }
            />
          </label>
        </div>
        <button
          type="button"
          className="btnSort"
          data-testid="column-sort-button"
          // onClick={ () => {
          //   this.setState({ id: (expenses.length + 1) });
          //   dispatch(fetchExpenses(this.state));
          //   this.clearData();
          // } }
        >
          Ordenar
        </button>
        <button
          type="button"
          className="btnRem"
          data-testid="button-remove-filters"
          // onClick={ () => {
          //   this.setState({ id: (expenses.length + 1) });
          //   dispatch(fetchExpenses(this.state));
          //   this.clearData();
          // } }
        >
          Limpar Filtros
        </button>
      </div>
      <div className="appFilters">
        <button
          type="button"
          className="btnAppFilters"
          onClick={ removeFilter }
          disabled={ inputs.var }
        >
          {filters.name}
          +
          {filters.column}
          +
          {filters.comparison}
          +
          {filters.value}
          <img
            src={ icon }
            width="15px"
            alt="excluir"
            name="icon"
            hidden={ inputs.var }
          />
        </button>
      </div>
    </main>
  );
}
