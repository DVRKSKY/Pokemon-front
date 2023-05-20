import React from 'react'
import Chip from './buttons/Chip'
import Popup from './Popup'
import style from '.././modules/navbar.module.sass'
import { useNavigate  } from "react-router-dom";
import { filterByOrigin } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';

//IMportamos el dispatch

export default function NavBar() {
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate ()
  const handleClick = (ruta) => {
    navigate(ruta)
  }

  //Codigo para filtrado por origen
  const dispatch = useDispatch()
  const handleOrigin = (e) => {
    e.preventDefault()
    const origen = e.target.value
    //console.log(origen);
    dispatch(filterByOrigin(origen))
  }
  //Codigo para filtrado por tipo
  const handleType = (e) => {
    e.preventDefault()
    limpiar()
    const tipo = e.target.value
    //console.log(origen);
    dispatch(filterByOrigin(tipo))
  }
  //Codigo para ordenamiento por nombre
  const handleOrderName = (e) => {
    e.preventDefault()
    const orden = e.target.value
    //console.log(origen);
    dispatch(filterByOrigin(orden))
  }
  //Codigo para ordenamiento por ataque
  const handleOrderAtaque = (e) => {
    e.preventDefault()
    const ataque = e.target.value
    //console.log(origen);
    dispatch(filterByOrigin(ataque))
  }
  //Codigo para borrar todos los filtros
  const limpiar = () => {
    const borrar = "all"
    dispatch(filterByOrigin(borrar))
  }
  //Filtrado por tipo
  const tipos = useSelector(state => state.colors)


  return (
    <div className={style.contenido}>
        <Chip texto="Buscar" icono="search" funcion={handleClick} ruta="/buscar"/>
        <Chip texto="Agregar" icono="add"  funcion={handleClick} ruta="/create"/>
        <Chip texto="Filtrar" icono="sort" funcion={() => setShowPopup(true)}/>
        <Popup handleClose={() => setShowPopup(false)} show={showPopup}>
          {/*Filtrado por origen 👇*/}
          <div className={style.contenidoFiltro}>
            <div>
              <h4 className={style.titulo} >Origen</h4>
              <select className={style.selectInput} onChange={handleOrigin} defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Filtrar por origen</option>
                <option value="db" >Base de datos</option>
                <option value="api" >Api pokemon</option>
                <option value="all" >Todos</option>
              </select>
            </div>
            {/*Filtrado por tipo 👇*/}
            <div>
              <h4 className={style.titulo} >Tipo</h4>
              <select className={style.selectInput} onChange={handleType} defaultValue={"DEFAULT"}>
                <option value="DEFAULT" defaultValue={"DEFAULT"}>Filtrar por tipo</option>
                {tipos.map(tipo => {
                  return(
                    <option key={tipo.id} value={tipo.name}>{tipo.name}</option>
                  )
                })}
              </select>
            </div>

          </div>
          
          {/*ordenamiento por nombre 👇*/}
          <div className={style.contenidoFiltro}>
            <div>
              <h4 className={style.titulo}>Nombre</h4>
              <select className={style.selectInput} onChange={handleOrderName} defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Ordenar por nombre</option>
                <option value="asc" >Ascendente</option>
                <option value="des" >Descendente</option>
              </select>
            </div>
            {/*ordenamiento por ataque 👇*/}
            <div>
              <h4 className={style.titulo}>Ataque</h4>
              <select className={style.selectInput}  onChange={handleOrderAtaque} defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Ordenar por ataque</option>
                <option value="ataqueAsc" >Ascendente</option>
                <option value="ataqueDes" >Descendente</option>
              </select>
            </div>
          </div>
          {/*Quitar todos los filtros*/}
          <div>
            <button className={style.botonFilter} onClick={limpiar}>
              Quitar filtros
            </button>
          </div>
        </Popup>
    </div>
  )
}
