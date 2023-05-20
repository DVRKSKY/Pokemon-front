import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import styles from '../modules/form.module.sass'
import CarouselForm from '../components/CarouselForm'
//axios.defaults.baseURL  = 'http://localhost:3001'
axios.defaults.baseURL  = 'https://pokemon-back-production-58fa.up.railway.app/'

export default function Form( ) {
  
  const [form, setForm] = useState({
    name: '',
    imagen: '',
    imagenGame: '',
    poderes: [
      "overgrow",
      "chlorophyll",
    ],
    vida: 0,
    ataque: 0,
    defensa: 0,
    ataqueEspecial: 0,
    defenzaEspecial: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    tipo: [],
  })

  const [errors, setErrors] = useState({
    name: '',
    imagen: '',
    imagenGame: '',
    //poderes: '',
    vida: 0,
    ataque: 0,
    defensa: 0,
    ataqueEspecial: 0,
    defenzaEspecial: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    tipo: [],
  })

  const changeHandler = (e) => {
    const property = e.target.name;
    const valor = e.target.value;
    const checked = e.target.checked;

    let newForm = { ...form };

    if (property === 'tipo') {
      if (checked && form[property].length < 2) {
        newForm[property] = [...form[property], valor];
      } else if (!checked) {
        newForm[property] = form[property].filter((type) => type !== valor);
      } else {
        return;
      }
    } else {
      newForm = { ...form, [property]: valor };
    }

    validate(newForm);
    setForm(newForm);
  }
  const validate = useCallback((form) => {
    //Podemos validar con una exppresion regular
    //if(expresionregular.test(form.propiedadaTestear)) => todo bien
    let newErrors = {};
    if (!form.name || form.name.length < 3) {
      newErrors.name = 'Mínimo 3 caracteres.';
    }
    //Validar campos url: No vacios y deben cumplir con el formarto url
    const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]|(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9]))(?::[0-9]{1,5})?(?:[/?#]\S*)?$/i;
    for (const key of ['imagen', 'imagenGame']) {
      if (!form[key]) {
        newErrors[key] = 'Este campo no debe estar vacío';
      } else if (!urlRegex.test(form[key])) {
        newErrors[key] = 'Ingrese un URL válido';
      }
    }
    // Validar campos numéricos: no vacíos y mayores a 0
    for (const key of ['vida', 'ataque', 'defensa', 'ataqueEspecial', 'defenzaEspecial']) {
      if (!form[key] || form[key] < 0 || form[key] > 200) {
        newErrors[key] = 'No debe ser 0';
      }
    }
    // Validar tipo: no más de 2 tipos de Pokémon seleccionados
    if (form.tipo.length > 2) {
      newErrors.tipo[0] = 'No puedes seleccionar más de 2 tipos de Pokémon.';
    }
    setErrors(newErrors);
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(form);
    axios.post('/posts', form)
      .then(res => console.log(res));
  }
  const isValid = (field) => {
    return !errors[field];
  }
  useEffect(() => {
    validate(form);
  }, [validate, form]);
  return (
    <div className={styles.fondo}>
      <div className={styles.pokeFondo}></div>
      <div className={styles.huevo}></div>

      <div className={styles.contenido}>
        
        <div className={styles.data}>
          <form className={styles.form} >
            <CarouselForm
              form={form}
              errors={errors}
              changeHandler={changeHandler}
              validate={validate}
              isValid={isValid}
              onSubmit={submitHandler}
            />
            </form>
        </div>
      </div>



    </div>
  )
}
