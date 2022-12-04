/* eslint-disable max-lines */
import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
// import StarWarsProvider from '../context/StarWarsProvider';
// import StarWarsContext from '../context/StarWarsContext';

import { response } from './mocks/mocks';

import App from '../App';

describe('Testa o componente <App />', () => {
  const { results } = response;
  const idNameFilter = 'name-filter';
  const idColumnFilter = 'column-filter';
  const idValueFilter = 'value-filter';
  const idBtnFilter = 'button-filter';
  const idComparisonFilter = 'comparison-filter';
  const arrayNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const data = results;
  const search = results;
  const inputs = { name: '' };
  const selected = { column: 'population', comparison: 'maior que', value: 0 };
  const selectedFilters = { column: 'population', comparison: 'maior que', value: 0 };
  const order = { column: 'population', direction: 'ASC' };
  // eslint-disable-next-line no-return-assign
  beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(response),
  }));

  test('Realize uma requisição para a API', async () => {
    // act(() => render(<App value={ { data, selected, order, search, selectedFilters, inputs } } />));
    render(<App />);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toBeCalledWith('https://swapi.py4e.com/api/planets');
  });

  test('Preencha a tabela com os dados retornados', async () => {
    render(<App />);
    const idRow = await screen.findByText('Tatooine');
    expect(idRow).toBeInTheDocument();
    const cellValue = await screen.findAllByText('23');
    expect(cellValue.length).toBe(arrayNumbers[3]);
    expect(await screen.findByText('304')).toBeInTheDocument();
    expect(await screen.findByText('10465')).toBeInTheDocument();
    expect(await screen.findByText(/arid/i)).toBeInTheDocument();
    const cellValueTwo = await screen.findAllByText('1 standard');
    expect(cellValueTwo.length).toBe(arrayNumbers[6]);
    expect(await screen.findByText(/desert/i)).toBeInTheDocument();
    expect(await screen.findByText(/Tatooine/i)).toBeInTheDocument();
  });

  test('Se a tabela tem 13 colunas', async () => {
    render(<App />);
    expect(screen.getAllByRole('columnheader').length)
      .toBe(arrayNumbers[13]);
  });

  test('Se a tabela tem uma linha para cada planeta retornado', async () => {
    render(<App />);
    const planetRow = await screen.findAllByTestId('planet-name');
    expect(planetRow.length).toBe(arrayNumbers[10]);
  });

  test('Se existe um filtro de texto para a tabela', async () => {
    render(<App />);
    expect(screen.getByTestId(idNameFilter)).toBeInTheDocument();
  });

  test('Se filtra corretamente os planetas que possuem a letra "o" no nome', async () => {
    render(<App />);
    const nameFilter = screen.getByTestId(idNameFilter);
    const bespin = await screen.findByText('Bespin');
    userEvent.type(nameFilter, 'o');
    expect(bespin).not.toBeInTheDocument();
    const coruscant = await screen.findByText(/coruscant/i);
    expect(coruscant).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[8]);
  });

  test('Se filtra corretamente os planetas que possuem a letra "oo" no nome', async () => {
    render(<App />);
    const nameFilter = screen.getByTestId(idNameFilter);
    const bespin = await screen.findByText(/bespin/i);
    const naboo = await screen.findByText(/naboo/i);
    const tatooine = await screen.findByText(/tatooine/i);
    userEvent.type(nameFilter, 'oo');
    expect(bespin).not.toBeInTheDocument();
    expect(naboo).toBeInTheDocument();
    expect(tatooine).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[3]);
  });

  test('Se filtra corretamente vários filtros em sequência', async () => {
    render(<App />);
    const nameFilter = screen.getByTestId(idNameFilter);
    const bespin = await screen.findByText(/bespin/i);
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[11]);
    userEvent.type(nameFilter, 'oo');
    expect(bespin).not.toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[3]);
    userEvent.type(nameFilter, '{backspace}');
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[8]);
  });

  test('Se renderiza corretament os filtros de coluna, de ordenação e de valor', async () => {
    render(<App />);
    expect(screen.getByTestId(idColumnFilter)).toBeInTheDocument();
    expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    const opt = screen.getAllByRole('option');
    expect(opt.length).toBe(arrayNumbers[13]);
    expect(opt[0].value).toBe('population');
    expect(opt[1].value).toBe('orbital_period');
    expect(opt[2].value).toBe('diameter');
    expect(opt[3].value).toBe('rotation_period');
    expect(opt[4].value).toBe('surface_water');
    expect(opt[5].value).toBe('maior que');
    expect(opt[6].value).toBe('menor que');
    expect(opt[7].value).toBe('igual a');
  });

  test('Se renderiza corretamente uma caixa de texto que só aceita valores numéricos', async () => {
    render(<App />);
    const valueFilter = screen.getByTestId(idValueFilter);
    expect(screen.getByTestId(idValueFilter)).toBeInTheDocument();
    expect(valueFilter.type).toBe('number');
  });

  test('Se renderiza corretament o botão para executar a filtragem', async () => {
    render(<App />);
    const btnFilter = screen.getByTestId(idBtnFilter);
    expect(screen.getByTestId(idBtnFilter)).toBeInTheDocument();
    expect(btnFilter.type).toBe('button');
    expect(btnFilter.innerHTML).toBe('Filtrar');
  });

  test('Verifica valores iniciais de cada campo', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId(idColumnFilter);
    expect(columnFilter.value).toBe('population');
    const comparisonFilter = screen.getByTestId(idComparisonFilter);
    expect(comparisonFilter.value).toBe('maior que');
    const valueFilter = screen.getByTestId(idValueFilter);
    expect(valueFilter.value).toBe('0');
  });

  test('Verifica se filtra utilizando apenas clicando o botão de filtrar', async () => {
    render(<App />);
    const btnFilter = screen.getByTestId(idBtnFilter);
    userEvent.click(btnFilter);
    expect(await screen.findByText(/yavin/i)).toBeInTheDocument();
    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();
    expect(await screen.findByText(/bespin/i)).toBeInTheDocument();
    expect(await screen.findByText(/endor/i)).toBeInTheDocument();
    expect(await screen.findByText(/kamino/i)).toBeInTheDocument();
    expect(await screen.findByText(/alderaan/i)).toBeInTheDocument();
    expect(await screen.findByText(/naboo/i)).toBeInTheDocument();
    expect(await screen.findByText(/coruscant/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[9]);
  });

  test('Verifica se filtra corretamente utilizando a comparação "menor que"', async () => {
    render(<App />);
    const comparisonFilter = screen.getByTestId(idComparisonFilter);
    userEvent.selectOptions(comparisonFilter, 'menor que');
    const columnFilter = screen.getByTestId(idColumnFilter);
    userEvent.selectOptions(columnFilter, 'surface_water');
    const valueFilter = screen.getByTestId(idValueFilter);
    userEvent.type(valueFilter, '40');
    const btnFilter = screen.getByTestId(idBtnFilter);
    userEvent.click(btnFilter);
    expect(await screen.findByText(/yavin/i)).toBeInTheDocument();
    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();
    expect(await screen.findByText(/bespin/i)).toBeInTheDocument();
    expect(await screen.findByText(/endor/i)).toBeInTheDocument();
    expect(await screen.findByText(/naboo/i)).toBeInTheDocument();
    expect(await screen.findByText(/dagobah/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[7]);
  });

  test('Verifica se filtra corretamente utilizando a comparação "maior que"', async () => {
    render(<App />);
    const comparisonFilter = screen.getByTestId(idComparisonFilter);
    userEvent.selectOptions(comparisonFilter, 'maior que');
    const columnFilter = screen.getByTestId(idColumnFilter);
    userEvent.selectOptions(columnFilter, 'diameter');
    const valueFilter = screen.getByTestId(idValueFilter);
    userEvent.type(valueFilter, '8900');
    const btnFilter = screen.getByTestId(idBtnFilter);
    userEvent.click(btnFilter);
    expect(await screen.findByText(/yavin/i)).toBeInTheDocument();
    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();
    expect(await screen.findByText(/bespin/i)).toBeInTheDocument();
    expect(await screen.findByText(/kamino/i)).toBeInTheDocument();
    expect(await screen.findByText(/alderaan/i)).toBeInTheDocument();
    expect(await screen.findByText(/naboo/i)).toBeInTheDocument();
    expect(await screen.findByText(/coruscant/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[8]);
  });

  test('Verifica se filtra corretamente utilizando a comparação "igual a"', async () => {
    render(<App />);
    const comparisonFilter = screen.getByTestId(idComparisonFilter);
    userEvent.selectOptions(comparisonFilter, 'igual a');
    const columnFilter = screen.getByTestId(idColumnFilter);
    userEvent.selectOptions(columnFilter, 'population');
    const valueFilter = screen.getByTestId(idValueFilter);
    userEvent.type(valueFilter, '200000');
    const btnFilter = screen.getByTestId(idBtnFilter);
    userEvent.click(btnFilter);
    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[2]);
  });

  test('Se a tabela apresenta corretamente os dados utilizando as informações de dois filtros', async () => {
    render(<App />);
    const comparisonFilter = screen.getByTestId(idComparisonFilter);
    userEvent.selectOptions(comparisonFilter, 'maior que');
    const columnFilter = screen.getByTestId(idColumnFilter);
    userEvent.selectOptions(columnFilter, 'diameter');
    const valueFilter = screen.getByTestId(idValueFilter);
    userEvent.type(valueFilter, '9000');
    const btnFilter = screen.getByTestId(idBtnFilter);
    userEvent.click(btnFilter);

    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.selectOptions(columnFilter, 'population');
    userEvent.type(valueFilter, '1000000');
    userEvent.click(btnFilter);
    expect(await screen.findByText(/yavin/i)).toBeInTheDocument();
    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[3]);
  });

  test('Se a tabela apresenta corretamente os dados utilizando as informações de três filtros', async () => {
    render(<App />);
    const comparisonFilter = screen.getByTestId(idComparisonFilter);
    userEvent.selectOptions(comparisonFilter, 'maior que');
    const columnFilter = screen.getByTestId(idColumnFilter);
    userEvent.selectOptions(columnFilter, 'diameter');
    const valueFilter = screen.getByTestId(idValueFilter);
    userEvent.type(valueFilter, '9000');
    const btnFilter = screen.getByTestId(idBtnFilter);
    userEvent.click(btnFilter);

    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.selectOptions(columnFilter, 'population');
    userEvent.type(valueFilter, '1000000');
    userEvent.click(btnFilter);

    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.type(valueFilter, '23');
    userEvent.click(btnFilter);
    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[2]);
  });

  test('Se não permite a utilização de filtros repetidos', async () => {
    render(<App />);
    expect(screen.getAllByRole('option').length).toBe(arrayNumbers[13]);
    const comparisonFilter = screen.getByTestId(idComparisonFilter);
    userEvent.selectOptions(comparisonFilter, 'maior que');
    const columnFilter = screen.getByTestId(idColumnFilter);
    userEvent.selectOptions(columnFilter, 'population');
    const valueFilter = screen.getByTestId(idValueFilter);
    userEvent.type(valueFilter, '8000');
    const btnFilter = screen.getByTestId(idBtnFilter);
    userEvent.click(btnFilter);
    expect(screen.getAllByRole('option').length).toBe(arrayNumbers[12]);
    expect(screen.getAllByRole('option')[0].value).not.toBe('population');
  });

  test('Adicione um filtro e verifique se a tabela foi atualizada com as informações filtradas, depois remova os filtros e verifique se os valores da tabela voltaram ao original', async () => {
    render(<App />);
    userEvent.selectOptions(screen.getByTestId(idComparisonFilter), 'maior que');
    userEvent.selectOptions(screen.getByTestId(idColumnFilter), 'diameter');
    userEvent.type(screen.getByTestId(idValueFilter), '8900');
    userEvent.click(screen.getByTestId(idBtnFilter));
    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[8]);
    userEvent.click(document.getElementsByClassName('btnAppFilters')[0]);
    expect(await screen.findByText(/endor/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[11]);
  });

  test('Adicione dois filtros e verifique se a tabela foi atualizada com as informações filtradas, depois remova os filtros e verifique se os valores da tabela voltaram ao original', async () => {
    render(<App />);
    userEvent.selectOptions(screen.getByTestId(idComparisonFilter), 'maior que');
    userEvent.selectOptions(screen.getByTestId(idColumnFilter), 'diameter');
    userEvent.type(screen.getByTestId(idValueFilter), '8900');
    userEvent.click(screen.getByTestId(idBtnFilter));
    expect(await screen.findByText(/bespin/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[8]);

    userEvent.selectOptions(screen.getByTestId(idComparisonFilter), 'menor que');
    userEvent.selectOptions(screen.getByTestId(idColumnFilter), 'population');
    userEvent.type(screen.getByTestId(idValueFilter), '1000000');
    userEvent.click(screen.getByTestId(idBtnFilter));
    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[3]);
    userEvent.click(screen.getByTestId('button-remove-filters'));
    expect(await screen.findByText(/endor/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[11]);
  });

  test('Se a tabela apresenta corretamente os dados utilizando as informações de três filtros', async () => {
    render(<App />);
    userEvent.selectOptions(screen.getByTestId(idComparisonFilter), 'maior que');
    userEvent.selectOptions(screen.getByTestId(idColumnFilter), 'diameter');
    userEvent.type(screen.getByTestId(idValueFilter), '9000');
    userEvent.click(screen.getByTestId(idBtnFilter));
    expect(await screen.findByText(/bespin/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[8]);

    userEvent.selectOptions(screen.getByTestId(idComparisonFilter), 'menor que');
    userEvent.selectOptions(screen.getByTestId(idColumnFilter), 'population');
    userEvent.type(screen.getByTestId(idValueFilter), '1000000');
    userEvent.click(screen.getByTestId(idBtnFilter));
    expect(await screen.findByText(/yavin/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[3]);

    userEvent.selectOptions(screen.getByTestId(idComparisonFilter), 'igual a');
    userEvent.selectOptions(screen.getByTestId(idColumnFilter), 'rotation_period');
    userEvent.type(screen.getByTestId(idValueFilter), '23');
    userEvent.click(screen.getByTestId(idBtnFilter));
    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(arrayNumbers[2]);
  });
});
