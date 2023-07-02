import React, { useState, useEffect } from 'react'
import './pokemon.css';
import { Detail } from '../interface';


interface Props {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    abilities?: {
        ability: string;
    }[];
    viewDetail: Detail;
    setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokeCard: React.FC<Props> = (props) => {
    const { id, name, sprites: { front_default }, viewDetail, setDetail, abilities } = props;
    const [isSelected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(id === viewDetail.id);
    }, [viewDetail])

    const closeDetail = () => {
        setDetail({
            id: 0,
            isOpened: false
        })
    }
    return (
        <>
            {isSelected ? (
                <div className="pokemon-list-detailed">
                    <div className="detail-container">
                        <div className="detail-close" onClick={closeDetail}>X</div>
                        <div className="detail-info">
                            <img src={front_default} alt={name} />
                            <p className="detail-name">{name}</p>
                        </div>
                        <div className="detail-skill">
                            <p className="detail-ability">Abilities: </p>
                            {
                                abilities?.map((skill: any, index: number) => {
                                    return (
                                        <div className="" key={index}>
                                            <p>{skill.ability.name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <section className="pokemon-list-container">
                    <img src={front_default} alt={name} />
                    <p className="pokemon-name">{name}</p>
                </section>
            )}
        </>
    )
}

export default PokeCard