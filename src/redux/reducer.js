import { GET_POKEMONS, GET_POKEMON, GET_COLORS, SET_COLOR_BACKGROUND, FILTER_BY_ORIGIN, MOVE_CARRUSEL, ACTIVE_INDEX, POKEMON_LOADED, POKEMON_LOADING, CLEAR_POKEMON_DETAIL } from './actions'

const initialState = {
    pokemons: [],
    pokemonDetail: [],
    pokemonsFiltered: [],
    colors: [],
    colorBackground: "rgba(250, 113, 121, 1)",
    i: 0,
    f: 4,
    activeIndex: 0,
    filtroActivado: false,
    pokemonLoading: true,

}
//Nuestra personita encargada de hacer todo
const rootReducer = (state=initialState, action) => {
    switch (action.type){
        case GET_POKEMONS:
            // Guardamos los pokemons actuales en una variable llamada beforePokemons
            const beforePokemons = state.pokemons;
            // Guardamos los pokemons que vienen en la acción (nuevos datos) en una variable llamada afterPokemons
            const afterPokemons = action.payload;
            // Creamos un array con los ids de los pokemons actuales llamado idsAnteriores
            const idsAnteriores = beforePokemons.map(({ id }) => id);
            // Filtramos los pokemons en afterPokemons que NO estén en idsAnteriores y los guardamos en pokemonsNuevos
            const pokemonsNuevos = afterPokemons.filter(({ id }) => !idsAnteriores.includes(id));
            // Concatenamos los arrays beforePokemons y pokemonsNuevos para crear un array actualizado llamado updatedPokemons
            const updatedPokemons = [...beforePokemons, ...pokemonsNuevos];
            // Retornamos un nuevo estado con los pokemons actualizados y la lista filtrada de pokemons actualizada
            return {
                ...state,
                pokemons: updatedPokemons,
                pokemonsFiltered: updatedPokemons,
            };
        case GET_POKEMON:
            return {...state, pokemonDetail: action.payload}
        case GET_COLORS:
            return {...state, colors: action.payload}
        case SET_COLOR_BACKGROUND:
            return {...state, colorBackground: action.payload}
        case FILTER_BY_ORIGIN:
            if(action.payload === "db"){
                const newFilter = state.pokemons.filter((pokemon) => pokemon.created === true )
                return {...state, pokemonsFiltered: newFilter, filtroActivado: true, i:0, f:4 ,activeIndex: 0}
            }else if(action.payload ==="api"){
                const newFilter = state.pokemons.filter((pokemon) => pokemon.created === false )
                return {...state, pokemonsFiltered: newFilter, filtroActivado: true, i:0, f:4 ,activeIndex: 0}
            }else if(action.payload === "all"){
                return {...state, pokemonsFiltered: state.pokemons , filtroActivado: false}

            //Ordenamiento por nombre
            } else if(action.payload === "asc"){
                //evitamos mutar el estado original y creamos un nuevo array
                const newOrd = [...state.pokemonsFiltered].sort((a,b)=> a.name.localeCompare(b.name))
                return {...state, pokemonsFiltered: newOrd , filtroActivado: true , i:0, f:4 ,activeIndex: 0}

            } else if(action.payload === "des"){
                //evitamos mutar el estado original y creamos un nuevo array
                const newOrd = [...state.pokemonsFiltered].sort((a,b)=> b.name.localeCompare(a.name))
                return {...state, pokemonsFiltered: newOrd , filtroActivado: true , i:0, f:4 ,activeIndex: 0}
            //Ordenamiento por ataque
            }else if( action.payload === "ataqueAsc"){
                const newOrd = [...state.pokemonsFiltered].sort((a,b)=> a.ataque - b.ataque)
                console.log(newOrd);
                return {...state, pokemonsFiltered: newOrd , filtroActivado: true , i:0, f:4 ,activeIndex: 0}
            }else if( action.payload === "ataqueDes"){
                const newOrd = [...state.pokemonsFiltered].sort((a,b)=> b.ataque - a.ataque);
                console.log(newOrd);
                return {...state, pokemonsFiltered: newOrd , filtroActivado: true , i:0, f:4 ,activeIndex: 0};

            //Filtro por tipo
            }else{
                const newFilter = state.pokemonsFiltered.filter((pokemon) => (pokemon.types[0] === action.payload || pokemon.types[1] === action.payload))
                if(newFilter.length <= 0){
                    console.log("NO HAY POKEMONS")
                }else{
                    console.log(newFilter, ":::Filtros por tipo")
                }
                return {...state, pokemonsFiltered: newFilter , filtroActivado: true , i:0, f:4 ,activeIndex: 0}
            }
        case MOVE_CARRUSEL:
            return {...state, i: action.payload[0], f:action.payload[1]}
        case ACTIVE_INDEX:
            return {...state, activeIndex: action.payload}
        case POKEMON_LOADING:
            return { ...state, pokemonLoading: true };
        case POKEMON_LOADED:
            return { ...state, pokemonLoading: false };
        case CLEAR_POKEMON_DETAIL:
            return { ...state,  pokemonDetail: state.pokemonDetail, pokemonLoading: state.pokemonLoading  };
        default:
            return {...state, colorBackground: action.payload}
    }
}

export default rootReducer