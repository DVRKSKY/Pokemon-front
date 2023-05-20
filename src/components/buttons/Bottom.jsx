import React, { useEffect, useCallback  } from 'react'
import style from '../../modules/bottomButton.module.sass'
export default function Bottom({texto1, texto2, boton1, boton2,retroceder, avanzar}) {
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'a' || event.key === 'A') {
      avanzar();
    } else if (event.key === 'b' || event.key === 'B') {
      retroceder();
    }
  }, [avanzar, retroceder]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  return (
    <div className={style.contenido} >
        <div className={style.contenidoBoton}>
            <div className={style.boton} onClick={()=> retroceder()}>
              <span>{boton1}</span>
            </div>
            <div className={style.texto}>{texto1}</div>
        </div>
        {boton2 && texto2 && (
          <div className={style.contenidoBoton}>
            <div className={style.boton} onClick={() => avanzar()}>
              <span>{boton2}</span>
            </div>
            <div className={style.texto}>{texto2}</div>
          </div>
        )}
    </div>
  )
}
