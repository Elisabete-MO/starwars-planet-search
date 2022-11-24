import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  return (
    <StarWarsContext.Provider value={ 'wait' }>
      { children }
    </StarWarsContext.Provider>
  );
}
