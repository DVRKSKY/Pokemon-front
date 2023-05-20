import React from 'react'
import style from '../modules/details.module.sass'
//Usamos una libreria para hacer el radar, ya que me tomaria mucho tiempo hacerla a mano
//Y quiero hacer un jueguito, asi que a apalancarse.
import Bottom from '../components/buttons/Bottom'
import { Radar } from 'react-chartjs-2'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getPokemon, clearPokemonDetail } from '../redux/actions'
import { useParams, useNavigate } from 'react-router-dom'


export default function Details() {
  let {id} = useParams()
  const detail = useSelector(state => state.pokemonDetail)
  const loading = useSelector(state => state.pokemonLoading)
  //console.log(detail);
  
  //Volver
  const navigate = useNavigate()
  const volver = () => {
    //Volvemos a la pagina anterior
    navigate(-1)
  }

  //Cargamos la data de los detalles en el momento que el componente  se monta
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getPokemon(id))
    // Limpiar el estado cuando el componente se desmonte
    return () => {
      dispatch(clearPokemonDetail());
    }
  },[dispatch,id])
  
  const getPokemonRadarData = () => {
    //Usamos detail[0] porque devuelve un array de coincidencias, pero solo queremos el primero 
    return {
      labels: ['Vida', 'Ataque', 'A. especial', 'Velocidad' , 'D. especial','Defensa', ],
      datasets: [
        {
          label: (loading)? 'Undefined' : detail[0]?.name,
          data: [
            (loading)? 0 : detail[0]?.vida,
            (loading)? 0 : detail[0]?.ataque,
            (loading)? 0 : detail[0]?.ataqueEspecial,
            (loading)? 0 : detail[0]?.velocidad,
            (loading)? 0 : detail[0]?.defenzaEspecial,
            (loading)? 0 : detail[0]?.defensa,
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };
  const getPokemonRadarOptions = () => {
    return {
      scales: {
        r: {
          min: 0,
          max: 200, // Aca definiremos el valor maximo del radar
          ticks: {
            stepSize: 50, // Los saltos entre bloques aqui definimos
            backdropColor: 'rgba(200, 200, 200, 0)', // Cambia el color de fondo aquí
          },
          pointLabels: {
            color: '#000', // Define el color del texto aquí
            font: {
              size: 14, // Define el tamaño de la fuente aquí
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  };
  
  return (
    <div className={style.fondo}>
      <div className={style.pokeFondo}></div>
      <div className={style.estadisticas}>
        <Radar className={style.radar} data={getPokemonRadarData} options={getPokemonRadarOptions()} />
        <div className={style.otrasStats}>
          <div className={style.contenido}>
          <h5 className={style.titulo}>Nombre: </h5>
            {loading 
              ? <h5 className={style.loading}>Cargando...</h5> 
              : <h5 className={style.texto}>{detail[0]?.name}</h5>
            }
          </div>
          <div className={style.contenido}>
            <h5 className={style.titulo}>Altura: </h5>
            {loading 
              ? <h5 className={style.loading}>Cargando...</h5> 
              : <h5 className={style.texto}>{detail[0]?.altura} pts</h5>
            }
          </div>
          <div className={style.contenido}>
            <h5 className={style.titulo}>peso: </h5>
            {loading 
              ? <h5 className={style.loading}>Cargando...</h5> 
              : <h5 className={style.texto}>{detail[0]?.peso}</h5>
            }
          </div>
          <div className={style.contenido}>
            <h5 className={style.titulo}>tipo: </h5>
            {loading 
              ? <h5 className={style.loading}>Cargando...</h5> 
              : <h5 className={style.texto}>{detail[0]?.types?.[0]}, {detail[0]?.types?.[1]}</h5>
            }
            
          </div>
        </div>
      </div>
      <div className={style.presentacion}>
        {loading 
            ? <div className={style.id}>#Undef</div> 
            : <div className={style.id}>#{String(detail[0]?.id).padStart(5, '0').slice(0, 5)}</div>
        }
        
        <div className={style.imagen}>
          {loading 
              ? <div></div>
              : <img src={detail[0]?.imagen ? detail[0]?.imagen : detail[0]?.imagenOriginal} alt={detail.name} className={style.imagen}/>
          }
          
        </div>
      </div>
      <div className={style.actions}>
        <Bottom
          texto1="Volver"
          boton1="B"
          retroceder={volver}

        />
      </div>
    </div>
  )
}
