import React from 'react'
import style from '../../modules/chip.module.sass'
export default function Chip({texto, icono, funcion, ruta}) {
  //Ya instalamos los iconos de google en la carpeta public
  return (
    <button className={style.chip} onClick={()=> funcion(ruta)}>
      <div className={style.icono}>
        <i className="material-icons">{icono}</i>
      </div>
      <div className={style.texto}>{texto}</div>
    </button>
  )
}
