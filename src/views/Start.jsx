import React from 'react'
import { useState } from 'react'
import style from '../modules/start.module.sass'
import { useNavigate } from 'react-router-dom'
export default function Start() {

    const [isActive, setIsActive] = useState(false)
    const navigate = useNavigate()

    const handlePokeballClick = () => {
        setIsActive(true)
        setTimeout(() => {
            navigate('/home')
        }, 400)
    }
    return (
        <div className={`${style.contenedor} ${isActive ? style.active : ''}`}>
            <div className={`${style.bloqueSuperior} ${isActive ? style.active : ''}`}>
                <div className={style.pokeboll} onClick={handlePokeballClick} ></div>
            </div>
            <div className={`${style.bloqueInferior} ${isActive ? style.active : ''}`}></div>
        </div>
    );
    
}
