import React, { Component } from 'react';
import TableContent from './TableContent';
import '../styles/table.css';

class Table extends Component {
  render() {
    return (
      <table className="box_table">
        <thead>
          <tr>
            <th id="thDescription">Nome</th>
            <th id="thTag">Período de Rotação</th>
            <th id="thMethod">Período de Órbita</th>
            <th id="thValue">Diâmetro</th>
            <th id="thCurrency">Clima</th>
            <th id="thRate">Gravidade</th>
            <th id="thConverter">Terreno</th>
            <th id="thCurrencyConverter">Superfície com Água</th>
            <th id="thEdit">População</th>
            <th id="thEdit">Filmes</th>
          </tr>
        </thead>
        <tbody>
          {/* <TableContent /> */}
          {/* { expenses.map((expense) => (<TableContent
            expense={ expense }
            key={ expense.id } */}
            {/* // onClickDelete={ this.handleDelete } */}
          {/* />))} */}
        </tbody>
      </table>
    );
  }
}

export default Table;
