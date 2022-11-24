import React, { Component } from 'react';
import '../styles/table_content.css';

class TableContent extends Component {
  handleDelete = ({ target }) => {
    dispatch(deleteExpenses(target.id));
  };

  render() {
    return (
      <tr id={ id }>
        {/* Adicione o atributo data-testid com o valor planet-name em todos os elementos da tabela que possuem o nome de um planeta. */}
      {/* //   <td>{ description }</td> */}
      {/* //   <td>{ tag }</td> */}
      {/* //   <td>{ method }</td> */}
      {/* //   <td> */}
      {/* //     { */}
      {/* //       (value) === '' */}
      {/* //         ? '0.00' */}
      {/* //         : parseFloat(value).toFixed(2) */}
      {/* //     } */}
      {/* //   </td> */}
      {/* //   <td>{ exchangeRates[currency].name }</td> */}
      {/* //   <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td> */}
      {/* //   <td> */}
      {/* //     { */}
      {/* //       Number.isNaN(value) */}
      {/* //         ? '0.00' */}
      {/* //         : (value * exchangeRates[currency].ask).toFixed(2) */}
      {/* //     } */}
      {/* //   </td> */}
      {/* //   <td>Real</td> */}
      {/* //   <td> */}
      {/* //     <button */}
      {/* //       type="button" */}
      {/* //       data-testid="delete-btn" */}
      {/* //       id={ id } */}
      {/* //       onClick={ this.handleDelete } */}
      {/* //     > */}
      {/* //       Excluir */}
      {/* //     </button> */}
      {/* //   </td> */}
      </tr>
    );
  }
}

export default TableContent;
