import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollection from './components/PokemonCollection';
import { Detail, PokemonDetail, Pokemon } from './interface';


const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [nextUrl, setNextUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false
  });


  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemon) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        console.log(poke);

        setPokemons((p) => [...p, poke.data])
        setLoading(false);
      })
    }
    getPokemons();
  }, [])

  const nextPage = async () => {
    setLoading(true);
    const res = await axios.get(nextUrl);

    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemon) => {
      const Poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemons((p) => [...p, Poke.data]);
      setLoading(false);
    })
  }
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection pokemons={pokemons} viewDetail={viewDetail} setDetail={setDetail} />
        {!viewDetail.isOpened && (
          <div className="btn">
            <button onClick={nextPage}>{loading ? "Loading..." : "Load more"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
