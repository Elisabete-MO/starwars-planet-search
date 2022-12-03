import React from 'react';
import '../styles/table.css';
import TableContent from './TableContent';

export default function Table() {
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
          <th id="thCreated">Criado</th>
          <th id="thEdited">Editado</th>
          <th id="thURL">Url</th>
        </tr>
      </thead>
      <TableContent />
    </table>
  );
}
