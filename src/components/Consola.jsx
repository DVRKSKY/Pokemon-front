import React from 'react'
import style from '../modules/consola.module.sass'
import { useState } from 'react'
import { useSelector } from 'react-redux'


export default function Consola(props) {



  //Creamos una variable para que cambie el fondo de acuerdo al pokemon seleccionado
  //const [fondoDinamico, setFondoDinamico] = useState('#63BC5A')
  const fondoDinamico = useSelector((state) => state.colorBackground);
  
  
  //Vamos a hacer que el Joystick siga al mouse
  const [position, setPosition] = useState({ x: 0, y: 0 })
  //Esta funcion obtiene la posicion del moussi


  function handleMouseMove(event) {
    if (event) {
      let resultadoX = (event.clientX - (window.innerWidth / 2))/ window.innerWidth
      let resultadoY = (event.clientY - (window.innerHeight/ 2))/ window.innerHeight
      setPosition({ x: resultadoX, y: resultadoY });
    }
  }
  return (
    <div className={style.fondo} onMouseMove={handleMouseMove}  style={{backgroundColor: fondoDinamico}} >
      <div className={style.consola} >
        <div className={style.mandoIzquierdo}>
          <div className={style.botones}>
            <div className={style.joystick}></div>
            <div className={style.flechas}>
              <div className={style.upArrow}></div>
              <div className={style.downArrow}></div>
              <div className={style.leftArrow}></div>
              <div className={style.rightArrow}></div>
            </div>
          </div>
        </div>
        <div className={style.pantalla} >
          {
          /*De esta manera renderiza el componente que le mando dentro del 
          componente consola sin hacer condicionales de location, me 
          parece más practico y limpio 😁*/
          props.children
          }
        </div>
        <div className={style.mandoDerecho}>
          <div className={style.botones}>
            <div className={style.flechas}>
              <div className={style.upArrow}></div>
              <div className={style.downArrow}></div>
              <div className={style.leftArrow}></div>
              <div className={style.rightArrow}></div>
            </div>
            <div className={style.joystick}>
              <div className={style.botonJoystick}  style={{ top: (position.y * 120)/2, left: (position.x * 120) / 2 }} ></div>
            </div>
            {/*<div className={style.home}></div>*/}
          </div>
        </div>
      </div>
    </div>
  )
}
