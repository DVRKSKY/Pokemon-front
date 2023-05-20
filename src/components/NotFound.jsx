import React from 'react'
import styles from '../modules/error.module.sass'
import Bottom from './buttons/Bottom'
import { useNavigate } from 'react-router-dom'
export default function NotFound() {
  const navigate = useNavigate()
  const volver = () => {
    navigate("/home")
  }
  return (
    <div className={styles.fondo}>
      <div className={styles.pokemonParther}></div>
      <div className={styles.pokelogo}></div>
      <div className={styles.actions}>
        <Bottom
          texto1="Volver"
          boton1="B"
          retroceder={volver}
        />
      </div>
    </div>
  )
}
