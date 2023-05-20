import React, { useEffect } from 'react';
import style from '../modules/home.module.sass';
import Cards from '../components/Cards';
import NavBar from '../components/NavBar';
import { useDispatch } from 'react-redux';
import {getPokemons} from '../redux/actions'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getPokemons())
  }, [])
  
  return (
    <div className={style.fondo}>
      <div className={style.navBar}>
        <NavBar/>
      </div>
      <div className={style.groupCards}>
        <Cards/>
      </div>
      <div className={style.pokeFondo}></div>
    </div>
  );
}
