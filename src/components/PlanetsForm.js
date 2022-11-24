import React, { useState } from 'react';
import '../styles/planets_form.css';

export default function PlanetsForm() {
  const [filters, setFilters] = useState({})
  // state = {
  //   id: 0,
  //   value: '',
  //   currency: 'USD',
  //   method: 'Cartão de débito',
  //   tag: 'Alimentação',
  //   description: '',
  // };

  // handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({ [name]: value });
  // };

  // clearData = () => {
  //   this.setState({
  //     value: '',
  //     currency: 'USD',
  //     method: 'Cartão de débito',
  //     tag: 'Alimentação',
  //     description: '',
  //   });
  // };
  return (
    <main className="box_form">
      <label htmlFor="nameFilter">
        <input
          type="text"
          className="nameFilter"
          data-testid="name-filter"
          id="nameFilter"
          name="nameFilter"
          placeholder="Encontre um planeta"
          value={ name }
          onChange={ this.handleChange }
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
            value={ column }
            onChange={ this.handleChange }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
            {/* { currencies.map((acc) => (
              <option key={ acc } data-testid="currency" name={ acc }>
                { acc }
              </option>))} */}
          </select>
        </label>
        <label htmlFor="selectComparison">
          Operador
          <select
            className="selectComparison"
            data-testid="comparison-filter"
            id="selectComparison"
            name="comparison"
            value={ comparison }
            onChange={ this.handleChange }
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
            value={ value }
            onChange={ this.handleChange }
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
            value={ sort }
            onChange={ this.handleChange }
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
              name="asc"
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
              name="desc"
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
