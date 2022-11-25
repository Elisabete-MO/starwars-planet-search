import React, { useState } from 'react';
import '../styles/planets_form.css';

export default function PlanetsForm() {
  const [filters, setFilters] = useState({
    name: '',
    column: '',
    comparison: '',
    value: 0,
    sort: '',
  });

  const handleChange = ({ target }) => {
    setFilters({ ...filters, [target.name]: target.value });
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
          value={ filters.name }
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
            value={ filters.column }
            onChange={ handleChange }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="selectComparison">
          Operador
          <select
            className="selectComparison"
            data-testid="comparison-filter"
            id="selectComparison"
            name="comparison"
            value={ filters.comparison }
            onChange={ handleChange }
          >
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
            value={ filters.value }
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          className="btnFilter"
          data-testid="button-filter"
          // onClick={ () => {
          //   this.setState({ id: (expenses.length + 1) });
          //   dispatch(fetchExpenses(this.state));
          //   this.clearData();
          // } }
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
            value={ filters.sort }
            onChange={ handleChange }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
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
    </main>
  );
}
