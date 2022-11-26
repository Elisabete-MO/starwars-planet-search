import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/table_content.css';

export default function TableContent() {
  const { data } = useContext(StarWarsContext);
  // handleDelete = ({ target }) => {
  //   dispatch(deleteExpenses(target.id));
  // };
  return (
    <tbody>
      {
        data.map((el) => (
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
        ))
      }
    </tbody>
  );
}
