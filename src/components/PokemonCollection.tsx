import React from 'react'
import { Detail, PokemonDetail } from '../interface'
import PokeCard from './PokeCard';
import './pokemon.css';

interface Props {
    pokemons: PokemonDetail[];
    viewDetail: Detail;
    setDetail: React.Dispatch<React.SetStateAction<Detail>>
}

const PokemonCollection: React.FC<Props> = (props) => {
    const { pokemons, viewDetail, setDetail } = props;

    const selectPokemon = (id: number) => {
        if (!viewDetail.isOpened) {
            setDetail({
                id,
                isOpened: true
            })
        }
    }
    return (
        <>
            <section className={viewDetail.isOpened ? "collection-container-active" : 'collection-container'}>
                {viewDetail.isOpened ? (
                    <div className="overlay"></div>
                ) : (
                    <div className=""></div>
                )}
                {pokemons.map((poke) => {
                    return (
                        <div className="" key={poke.id} onClick={() => selectPokemon(poke.id)}>
                            <PokeCard key={poke.id} {...poke} viewDetail={viewDetail} setDetail={setDetail} />
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default PokemonCollection