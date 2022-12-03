import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import { act, renderHook } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import StarWarsProvider from '../context/StarWarsProvider';
import StarWarsContext from '../context/StarWarsContext';

import { response } from './mocks/mocks';

import App from '../App';

describe('Testa o componente <App />', () => {
  const { results } = response;
  beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({ results })
  }))

  test('Realize uma requisição para a API', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledWith('https://swapi.py4e.com/api/planets');
  });

  test('Preencha a tabela com os dados retornados', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });

    waitFor(async () => {
    const idRow = screen.findByText(/Tatooine/i);
    expect((await idRow).key).toBe(/Tatooine/i);
    console.log(idRow.key);
    expect(await idRow).toBeInTheDocument();
    expect(await screen.findByText('23')).toBeInTheDocument();
    expect(await screen.findByText('304')).toBeInTheDocument();
    expect(await screen.findByText('10465')).toBeInTheDocument();
    expect(await screen.findByText(/arid/i)).toBeInTheDocument();
    expect(await screen.findByText('1 standard')).toBeInTheDocument();
    expect(await screen.findByText(/desert/i)).toBeInTheDocument();
    expect(await screen.findByText(/Tatooine/i)).toBeInTheDocument();
    });

  });

  test('Se a tabela tem 13 colunas', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {
      expect(await screen.findAllByRole('columnheader')).toBe('13');

    });
  });
  
  test('Se a tabela tem uma linha para cada planeta retornado', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {
      expect(await screen.findAllByRole('row')).toBe('10');

    });
  });
 
  test('Se existe um filtro de texto para a tabela', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      const nameFilter = screen.getByTestId('name-filter');
      expect(screen.getByTestId('name-filter')).toBeInTheDocument;
      expect(await screen.findAllByRole('row')).toBe('10');
    });
  });      
      
  test('Se filtra corretamente os planetas que possuem a letra "o" no nome', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      const nameFilter = screen.getByTestId('name-filter');
      userEvent.type(nameFilter, 'o');
      expect(await screen.findByText(/coruscant/i)).toBeInTheDocument();
      expect(await screen.findByText(/dagobah/i)).toBeInTheDocument();
      expect(await screen.findByText(/endor/i)).toBeInTheDocument();
      expect(await screen.findByText(/hoth/i)).toBeInTheDocument();  
      expect(await screen.findByText(/kamino/i)).toBeInTheDocument();
      expect(await screen.findByText(/naboo/i)).toBeInTheDocument();  
      expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();  
    });
  });   

  test('Se filtra corretamente os planetas que possuem a letra "oo" no nome', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      const nameFilter = screen.getByTestId('name-filter');
      userEvent.type(nameFilter, 'oo');
      expect(await screen.findByText(/naboo/i)).toBeInTheDocument();  
      expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();  
    });
  });   

  test('Se filtra corretamente vários filtros em sequência', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      const nameFilter = screen.getByTestId('name-filter');
      userEvent.type(nameFilter, 'o');
      expect(await screen.findAllByRole('row')).toBe('7');
      userEvent.type(nameFilter, 'o');
      expect(await screen.findAllByRole('row')).toBe('2');
      userEvent.type(nameFilter, '{del}');
      expect(await screen.findAllByRole('row')).toBe('7');
    });
  });  

  test('Se renderiza corretament o filtro de coluna', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      expect(await screen.getByTestId('column-filter')).toBeInTheDocument();
      expect(await screen.getByRole('menuitem', { name: 'population' })).toBeInTheDocument();
      expect(await screen.getByRole('menuitem', { name: 'orbital_period' })).toBeInTheDocument();
      expect(await screen.getByRole('menuitem', { name: 'diameter' })).toBeInTheDocument();
      expect(await screen.getByRole('menuitem', { name: 'rotation_period' })).toBeInTheDocument();
      expect(await screen.getByRole('menuitem', { name: 'surface_water' })).toBeInTheDocument();
    });
  }); 
  
  test('Se renderiza corretament o filtro de faixa de valores', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

    expect(await screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(await screen.getByRole('menuitem', { name: 'maior que' })).toBeInTheDocument();
    expect(await screen.getByRole('menuitem', { name: 'menor que' })).toBeInTheDocument();
    expect(await screen.getByRole('menuitem', { name: 'igual a' })).toBeInTheDocument();
    });
  });  

  test('Se renderiza corretament caixa de texto que só aceita números', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      const valueFilter = screen.getByTestId('value-filter');
      expect(screen.getByTestId('value-filter')).toBeInTheDocument();
      expect(typeof valueFilter).toBe('input');
      expect(valueFilter.type).toBe('number');
    });
  }); 

  test('Se renderiza corretament o botão para executar a filtragem', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      const btnFilter = screen.getByTestId('button-filter');
      expect(screen.getByTestId('button-filter')).toBeInTheDocument();
      expect(typeof btnFilter).toBe('button');
      expect(btnFilter.innerText).toBe(/filtrar/i);
    });
  }); 

  test('Verifica valores iniciais de cada campo', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      const columnFilter = screen.getByTestId('column-filter');
      expect(columnFilter.selected).toBe('population');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      expect(comparisonFilter.selected).toBe('maior que');
      const valueFilter = screen.getByTestId('value-filter');
      expect(valueFilter.innerText).toBe(0);
    });
  }); 

  test('Verifica se filtra utilizando apenas clickando o botão de filtrar', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      const btnFilter = screen.getByTestId('button-filter');
      userEvent.click(btnFilter);
      expect(await screen.findByText(/yavin/i)).toBeInTheDocument();
      expect(await screen.findByText(/tatooine/i)).toBeInTheDocument(); 
      expect(await screen.findByText(/bespin/i)).toBeInTheDocument();
      expect(await screen.findByText(/endor/i)).toBeInTheDocument();
      expect(await screen.findByText(/kamino/i)).toBeInTheDocument();
      expect(await screen.findByText(/alderaan/i)).toBeInTheDocument();  
      expect(await screen.findByText(/naboo/i)).toBeInTheDocument();  
      expect(await screen.findByText(/coruscant/i)).toBeInTheDocument(); 
      expect(await screen.findAllByRole('row')).toBe('8');
    });
  }); 

  test('Verifica se filtra corretamente utilizando a comparação "menor que"', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      const comparisonFilter = screen.getByTestId('comparison-filter');
      userEvent.click(comparisonFilter);
      userEvent.click(screen.getByText('menor que'));
      const columnFilter = screen.getByTestId('column-filter');
      userEvent.click(columnFilter);
      userEvent.click(screen.getByText('surface_water'));
      const valueFilter = screen.getByTestId('value-filter');
      userEvent.type(valueFilter, '40');
      const btnFilter = screen.getByTestId('button-filter');
      userEvent.click(btnFilter);
      expect(await screen.findByText(/yavin/i)).toBeInTheDocument();
      expect(await screen.findByText(/tatooine/i)).toBeInTheDocument(); 
      expect(await screen.findByText(/bespin/i)).toBeInTheDocument();
      expect(await screen.findByText(/endor/i)).toBeInTheDocument();
      expect(await screen.findByText(/naboo/i)).toBeInTheDocument();  
      expect(await screen.findByText(/dagobah/i)).toBeInTheDocument();
      expect(await screen.findAllByRole('row')).toBe('6');
    });
  }); 

  test('Verifica se filtra corretamente utilizando a comparação "maior que"', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      const comparisonFilter = screen.getByTestId('comparison-filter');
      userEvent.click(comparisonFilter);
      userEvent.click(screen.getByText('maior que'));
      const columnFilter = screen.getByTestId('column-filter');
      userEvent.click(columnFilter);
      userEvent.click(screen.getByText('diameter'));
      const valueFilter = screen.getByTestId('value-filter');
      userEvent.type(valueFilter, '8900');
      const btnFilter = screen.getByTestId('button-filter');
      userEvent.click(btnFilter);
      expect(await screen.findByText(/yavin/i)).toBeInTheDocument();
      expect(await screen.findByText(/tatooine/i)).toBeInTheDocument(); 
      expect(await screen.findByText(/bespin/i)).toBeInTheDocument();
      expect(await screen.findByText(/kamino/i)).toBeInTheDocument();
      expect(await screen.findByText(/alderaan/i)).toBeInTheDocument();  
      expect(await screen.findByText(/naboo/i)).toBeInTheDocument();  
      expect(await screen.findByText(/coruscant/i)).toBeInTheDocument(); 
      expect(await screen.findAllByRole('row')).toBe('7');
    });
  });

  test('Verifica se filtra corretamente utilizando a comparação "igual a"', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      const comparisonFilter = screen.getByTestId('comparison-filter');
      userEvent.click(comparisonFilter);
      userEvent.click(screen.getByText('igual a'));
      const columnFilter = screen.getByTestId('column-filter');
      userEvent.click(columnFilter);
      userEvent.click(screen.getByText('population'));
      const valueFilter = screen.getByTestId('value-filter');
      userEvent.type(valueFilter, '200000');
      const btnFilter = screen.getByTestId('button-filter');
      userEvent.click(btnFilter);
      expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();  
      expect(await screen.findAllByRole('row')).toBe('1');
    });
  });

  test('Se a tabela apresenta corretamente os dados utilizando as informações de dois filtros', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });  
    waitFor(async () => {

      const comparisonFilter = screen.getByTestId('comparison-filter');
      userEvent.click(comparisonFilter);
      userEvent.click(screen.getByText('maior que'));
      const columnFilter = screen.getByTestId('column-filter');
      userEvent.click(columnFilter);
      userEvent.click(screen.getByText('diameter'));
      const valueFilter = screen.getByTestId('value-filter');
      userEvent.type(valueFilter, '9000');
      const btnFilter = screen.getByTestId('button-filter');
      userEvent.click(btnFilter);

      userEvent.click(comparisonFilter);
      userEvent.click(screen.getByText('menor que'));
      userEvent.click(columnFilter);
      userEvent.click(screen.getByText('population'));
      userEvent.type(valueFilter, '1000000');
      userEvent.click(btnFilter);
      expect(await screen.findByText(/yavin/i)).toBeInTheDocument();
      expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();  
      expect(await screen.findAllByRole('row')).toBe('2');
    });
  });

  test('Se a tabela apresenta corretamente os dados utilizando as informações de três filtros', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      const comparisonFilter = screen.getByTestId('comparison-filter');
      userEvent.click(comparisonFilter);
      userEvent.click(screen.getByText('maior que'));
      const columnFilter = screen.getByTestId('column-filter');
      userEvent.click(columnFilter);
      userEvent.click(screen.getByText('diameter'));
      const valueFilter = screen.getByTestId('value-filter');
      userEvent.type(valueFilter, '9000');
      const btnFilter = screen.getByTestId('button-filter');
      userEvent.click(btnFilter);

      userEvent.click(comparisonFilter);
      userEvent.click(screen.getByText('menor que'));
      userEvent.click(columnFilter);
      userEvent.click(screen.getByText('population'));
      userEvent.type(valueFilter, '1000000');
      userEvent.click(btnFilter);

      userEvent.click(comparisonFilter);
      userEvent.click(screen.getByText('igual a'));
      userEvent.click(columnFilter);
      userEvent.click(screen.getByText('rotation_period'));
      userEvent.type(valueFilter, '23');
      userEvent.click(btnFilter);
      expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();  
      expect(await screen.findAllByRole('row')).toBe('1');
    });
  });

  test('Se não permite a utilização de filtros repetidos', async () => {
    act(() => {
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>,
      );
    });
    waitFor(async () => {

      const columnFilter = screen.getByTestId('column-filter');
      expect(await screen.getByRole('menuitem', { name: 'population' })).toBeInTheDocument();
      expect(await screen.getByRole('menuitem', { name: 'orbital_period' })).toBeInTheDocument();
      expect(await screen.getByRole('menuitem', { name: 'diameter' })).toBeInTheDocument();
      expect(await screen.getByRole('menuitem', { name: 'rotation_period' })).toBeInTheDocument();
      expect(await screen.getByRole('menuitem', { name: 'surface_water' })).toBeInTheDocument();
      const comparisonFilter = screen.getByTestId('comparison-filter');
      userEvent.click(comparisonFilter);
      userEvent.click(screen.getByText('maior que'));    
      userEvent.click(columnFilter);
      userEvent.click(screen.getByText('population'));
      const valueFilter = screen.getByTestId('value-filter');
      userEvent.type(valueFilter, '8000');

      const btnFilter = screen.getByTestId('button-filter');
      userEvent.click(btnFilter);

      expect(await screen.getByRole('menuitem', { name: 'population' })).not.toBeInTheDocument();
      expect(await screen.getByRole('menuitem', { name: 'orbital_period' })).toBeInTheDocument();
      expect(await screen.getByRole('menuitem', { name: 'diameter' })).toBeInTheDocument();
      expect(await screen.getByRole('menuitem', { name: 'rotation_period' })).toBeInTheDocument();
      expect(await screen.getByRole('menuitem', { name: 'surface_water' })).toBeInTheDocument();
    });
  });


    //   const { result } = renderHook(() => setSelected(), {
  //     column: 'population',
  //     comparison: 'maior que',
  //     value: 0,
  //   });

  //   const spy = jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(response),
  //   });

  //     <StarWarsContext.Provider value={ { dataPlanets, dataHeader, response } }>
  //       <App />
  //     </StarWarsContext.Provider>,

  //   expect(jest.fn().mockName('setSelected')).toBeCalledWith({ ...selected, column: 'population'} );
  // });

    // const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    // waitFor(() => {
    //   expect(history.location.pathname).toBe('/game');
    // });
    // const gameCategory = screen.findByText('Entertainment: Video Games');
    // expect(await gameCategory).toBeInTheDocument();

    // const linkElement = screen.getByText(/Hello, App!/i);
    // expect(linkElement).toBeInTheDocument();

});
