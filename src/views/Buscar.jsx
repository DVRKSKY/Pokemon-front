import React, { useState, useEffect } from 'react'
import styles from '../modules/buscar.module.sass'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//axios.defaults.baseURL  = 'http://localhost:3001'
axios.defaults.baseURL  = 'https://pokemon-back-production-58fa.up.railway.app/'

export default function Buscar() {
    
    const navigate = useNavigate()
    const volver = () => {
        navigate(-1)
    }
    const [inputName, setInputName] = useState("")
    const [errors, setErrors] = useState("")

    const validate = async (inputName) => {
        let newErrors = "";
        if (!inputName || inputName.length < 3) {
            newErrors = 'Mínimo 3 caracteres.';
        } else {
            try {
                const apiData = await axios.get(`/pokemons?name=${inputName}`);
                const info = apiData.data;
                if (info.length === 0) {
                    newErrors = "El pokemon no se encuentra en la base de datos ni en la API.";
                } else {
                    navigate(`/details/${info[0].id}`);
                }
            } catch (error) {
                newErrors = "No se encuentra al pokemon :c ";
            }
        }
        return newErrors;
    };

    useEffect(() => {
        let isMounted = true;
        const updateErrors = async () => {
            const newErrors = await validate(inputName);
            if (isMounted) {
                setErrors(newErrors);
            }
        };
        updateErrors();
        return () => {
            isMounted = false;
        };
    }, [inputName]);

    const handleInputChange = (e) => {
        const valor = e.target.value;
        setInputName(valor);
    };

    return (
        <div className={styles.fondo}>
            <div className={styles.pokemonParther}></div>
            <div className={styles.pokelogo}></div>
            <div className={styles.contenido}>
                <div className={styles.data}>
                    <form className={styles.form}>
                        <div>
                            <h2 className={styles.titulo}>
                                <span style={{ fontWeight: "bold" }}>Buscar </span> pokemon
                            </h2>
                            <input
                                name="nombre"
                                type="text"
                                placeholder="Ingresa el nombre"
                                value={inputName}
                                onChange={handleInputChange}
                                className={styles.inputForm}
                            />
                        </div>
                        <div>
                            {errors && <div className={styles.error}>{errors}</div>}
                        </div>
                        <div className={styles.botones}>

                            <div className={styles.contenidoBoton}>
                                <div
                                    className={styles.boton}
                                    onClick={volver}
                                >
                                    <span>A</span>
                                </div>
                                <div className={styles.texto}>Volver</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
