// useColors.js
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useColors = (tipo) => {
  const [color, setColor] = useState({});
  const colors = useSelector((state) => state.colors);
  //-console.log(colors, "::::COLORS ARRAY");
  //-console.log(tipo, "::::TIPO");
  useEffect(() => {
    const aux = colors.find((c) => c.name === tipo);
    if (aux) {
      setColor(aux);
    } else {
      setColor({ color: 'rgba(99,188,90,1)' }); // Valor predeterminado en caso de que no se encuentre un color
    }
  }, [tipo, colors]);

  return color;
};

export default useColors;
