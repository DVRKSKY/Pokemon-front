import React from 'react';
import style from '../modules/cards.module.sass';
import pokebola from '../assets/pokebola.svg';
import useColors from '../hooks/useColors';

const Card = ({ id, imagen, name, tipo, onCardClick, isActive, imagenOriginal }) => {
    const { color } = useColors(tipo[0])
  
    const cardBackground = color
      ? `linear-gradient(0deg, ${color} 0%, ${color.slice(0, -2)}0.4) 100%)`
      : 'transparent';
  
    return (
      <div
        className={`${style.card} ${isActive ? style.active : ""}`}
        style={{
          backgroundImage: cardBackground,
        }}
        
      >
        <h1 className={style.id}>{String(id).padStart(5, '0').slice(0, 5)}</h1>
        <img className={style.personaje} src={imagen ? imagen : imagenOriginal} alt={name} />
        <h2 className={style.nombre}>{name}</h2>
        <div className={style.backId}>#{String(id).padStart(5, '0').slice(0, 5)}</div>
        <img className={style.action} src={pokebola} onClick={onCardClick} alt={name} />
      </div>
    );
  };

export default Card;
