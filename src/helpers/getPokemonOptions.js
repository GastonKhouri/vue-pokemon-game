import { pokeApi } from '../apis/pokeApi';

const getPokemons = () => {

    const pokemonsArr = Array.from( Array( 650 ) );

    const pokemonsIdArr = pokemonsArr.map( ( _, index ) => {
        return index + 1;
    } );

    return pokemonsIdArr;

};

const getPokemonOptions = async () => {

    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5 );

    const pokemonNames = await getPokemonNames( mixedPokemons.splice( 0, 4 ) );

    return pokemonNames;

};

const getPokemonNames = async ( pokemons = [] ) => {

    const pokemonNames = await Promise.all( [
        pokeApi.get( `/${ pokemons[ 0 ] }` ),
        pokeApi.get( `/${ pokemons[ 1 ] }` ),
        pokeApi.get( `/${ pokemons[ 2 ] }` ),
        pokeApi.get( `/${ pokemons[ 3 ] }` ),
    ] );

    return pokemonNames.map( ( { data } ) => ( {
        name: data.name,
        id: data.id
    } ) );

};

export default getPokemonOptions;

