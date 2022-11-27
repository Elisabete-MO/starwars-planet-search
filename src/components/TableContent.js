import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/table_content.css';

export default function TableContent() {
  const { search, selectedFilters, sort } = useContext(StarWarsContext);

  const appFilters = () => {
    const filterResults = search.filter((el) => {
      const filterApp = selectedFilters.map(({ column, comparison, value }) => { // Acessar uma linha do filtro
        switch (comparison) {
        case 'maior que':
          return Number(el[column]) > Number(value);
        case 'menor que':
          return Number(el[column]) < Number(value);
        case 'igual a':
          return Number(el[column]) === Number(value);
        default:
          return true;
        }
      });
      return filterApp.every((e) => e);
    });
    return filterResults;
  };

  const dataSort = (a, b) => {
    const { column, direction } = sort;
    const val = -1;
    return (direction === 'ASC')
      ? ((a[column]) - (b[column])) : ((a[column]) - (b[column])) * val;
  };

  return (
    <tbody>
      { appFilters()
        .sort(dataSort)
        .map((el) => (
          <tr key={ el.name }>
            <td data-testid="planet-name">{ el.name }</td>
            <td>{ el.rotation_period }</td>
            <td>{ el.orbital_period }</td>
            <td>{ el.diameter }</td>
            <td>{ el.climate }</td>
            <td>{ el.gravity }</td>
            <td>{ el.terrain }</td>
            <td>{ el.surface_water }</td>
            <td>{ el.population }</td>
            <td>{ el.films }</td>
            <td>{ el.created }</td>
            <td>{ el.edited }</td>
            <td>{ el.url }</td>

            {/* <td>
          {
            (value) === ''              Number.isNaN(value)

              ? '0.00'
              : parseFloat(value).toFixed(2)
          }
        </td> */}
          </tr>
        ))}
    </tbody>
  );
}
