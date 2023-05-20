import React, { useEffect, useState } from 'react';
import styles from '../modules/carruselForm.module.sass';
import {useNavigate } from 'react-router-dom'

//import styles from '../modules/form.module.sass'
const CarouselForm = ({ form, errors, changeHandler, validate, isValid, onSubmit }) => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate("/home")
  }
    const steps = [
        { field: 'name', type: 'text', label: 'Name:', header: 'Nombra' },
        { field: 'imagen', type: 'text', label: 'Imagen:', header: 'Imagen' },
        { field: 'imagenGame', type: 'text', label: 'Imagen Game:' , header: 'Pixelart' },
        { field: 'vida', type: 'range', label: 'Vida:' , header: 'Vida' },
        { field: 'ataque', type: 'range', label: 'Ataque:' , header: 'Ataque' },
        { field: 'defensa', type: 'range', label: 'Defensa:' , header: 'Defensa' },
        { field: 'ataqueEspecial', type: 'range', label: 'Ataque Especial:' , header: 'Ataque especial'},
        { field: 'defenzaEspecial', type: 'range', label: 'Defensa Especial:' , header: 'Defensa especial' },
        { field: 'velocidad', type: 'range', label: 'Velocidad:' , header: 'Velocidad' },
        { field: 'altura', type: 'range', label: 'Altura:' , header: 'Altura'},
        { field: 'peso', type: 'range', label: 'Peso:' , header: 'Peso'},
        
        {
          field: 'tipo',
            type: 'checkbox-group',
            label: 'Tipo:',
            header: 'Selecciona el tipo',
            options: [
              "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost",
              "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon",
              "dark", "fairy", "unknown", "shadow",
            ],
        },  
        { field: 'enviar', type: 'button', label: 'Crear a' , header: 'Crea'},
        { field: 'final', type: 'button', label: 'Ir al home' , header: 'Pokemon creado'},

          // Agrega el resto de los campos aquí.
        ];
    
    const totalSteps = steps.length;
    const [currentStep, setCurrentStep] = useState(0);
    const currentField = steps[currentStep]; // Agrega esta línea
    
    
    const nextStep = (e) => {
        e.preventDefault();
        if (isValid(currentField.field)) {
          setCurrentStep(currentStep + 1);
        }
    };
      
    const prevStep = (e) => {
        //Se reiniciaba
        e.preventDefault();
        setCurrentStep(currentStep - 1);
    };
    const enviarData = (e) => {
      onSubmit(e)
      nextStep(e)
      
    }
    
    return (
        <div className={styles.carouselForm}>
          {currentField.type === 'checkbox-group' ? (
            <div>
                <h2 className={styles.titulo}>
                    <span style={{ fontWeight: "bold" }}>{currentField.header}</span>  de tu nuevo pokemon
                </h2>
                <div className={styles.checkboxGroup}>
                {currentField.options.map((type) => (
                    <label key={type} className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        name="tipo"
                        value={type}
                        checked={form.tipo.includes(type)}
                        onChange={changeHandler}
                    />
                    {type}
                    </label>
                ))}
                </div>
            </div>
          ) : (
            currentField.type === 'button' ? ( 
              currentField.field === 'enviar' ? (
                <div>
                    <h2 className={styles.titulo}>
                        <span style={{ fontWeight: "bold" }}>{currentField.header}</span> a tu nuevo pokemon
                    </h2>
                    <div
                      onClick={enviarData}
                      className={styles.botonForm}
                    >
                      <div className={styles.icono}>
                        <span className="material-symbols-outlined">egg</span>
                      </div>
                      <div className={styles.texto}>Crear a {form.name}</div>
                      
                    </div>
                </div>
              ) : (
                <div>
                    <h2 className={styles.titulo}>
                        <span style={{ fontWeight: "bold" }}>{currentField.header}</span> correctamente
                    </h2>
                    <div
                      onClick={goHome}
                      className={styles.botonForm}
                    >
                      <div className={styles.icono}>
                        <span className="material-symbols-outlined">home</span>
                      </div>
                      <div className={styles.texto}>Ir al home</div>
                      
                    </div>
                </div>
              )
            
            ) : (
              <div>
                  <h2 className={styles.titulo}>
                      <span style={{ fontWeight: "bold" }}>{currentField.header}</span>  a tu nuevo pokemon
                  </h2>
                  <input
                    max="200"
                    name={currentField.field}
                    type={currentField.type}
                    value={form[currentField.field]}
                    onChange={changeHandler}
                    className={currentField.type === "range" ? styles.rangeStyle : styles.inputForm}
                  />
                  <span className={currentField.type === "range" ? styles.rangeData : styles.contenidoBotonNone}>{form[currentField.field]}</span>
              </div>
            )
          )}
          <div>
            {errors[currentField.field] && <div className={styles.error}>{errors[currentField.field]}</div>}
          </div>
          <div className={styles.botones}>
            <div className={currentStep === totalSteps - 1 ? styles.contenidoBotonNone : styles.contenidoBoton}>
                <div 
                    className={currentStep === totalSteps - 1 ? styles.botonDisabled : styles.boton} 
                    onClick={currentStep === 0 ? goHome : prevStep} 
                >
                    <span>B</span>
                </div>
                <div className={styles.texto}>Volver</div>
            </div>
            <div className={currentStep === totalSteps - 1 ? styles.contenidoBotonNone : styles.contenidoBoton}>
                <div
                    className={errors[currentField.field] || currentStep === totalSteps - 1 ? styles.botonDisabled : styles.boton}
                    onClick={errors[currentField.field] ? undefined : (currentStep === totalSteps - 1 ? undefined : nextStep)}
                >
                    <span>A</span>
                </div>
                <div className={styles.texto}>Siguiente</div>
            </div>


          </div>
        </div>
      );
  };
  
export default CarouselForm;
