import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/table_content.css';

export default function TableContent() {
  const { search, selectedFilters, order } = useContext(StarWarsContext);

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
    // const letters = [];
    // const numbers = [];
    const { column, direction } = order;
    const val = -1;
    return (direction === 'ASC')
      ? /[A-Za-z]/.test(a[column]) - /[A-Za-z]/.test(b[column]) || a[column] - b[column]
      : ((parseInt(a[column], 10)) - (parseInt(b[column], 10))) * val;
    // if (column === 'population') {
    //   for (let i = 0; i < arr.length; i += 1) {
    //     if (arr[i].population === 'unknow') letters.push(arr[i]);
    //     else numbers.push(arr[i]);
    //   }
    // }
    // if (direction === 'ASC') numbers[column].sort((a, b) => a - b);
    // else numbers[column].sort((a, b) => b - a);
    // return numbers.concat(letters);
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
