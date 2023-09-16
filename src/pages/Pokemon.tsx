import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PokeballImg from "../assets/pokeball.png"
import Footer from '../components/Footer';
import styles from '../components/pokemon.module.css'
import { PokemonDetails } from '../types/types';
import { fetchPokemon } from '../api/fetchPokemon';
import LoadingScreen from '../components/LoadingScreen';
import { waitFor } from '../api/utils/utils';

const Pokimon = () => {
   const [isLoading, setIsLoading] = useState(false)
   const [pokemon, setPokemon] = useState<PokemonDetails>()
   const {name} = useParams();
   const navigate = useNavigate();

   useEffect(() => {
        async function getPokemon() {
        setIsLoading(true);
        await waitFor(500);
        const fetchedPokemon = await fetchPokemon(name as string)
        setPokemon(fetchedPokemon);
        setIsLoading(false)
    }
    getPokemon();

   }, [name])
   
   if(isLoading||!pokemon){
        return(
        <LoadingScreen/>
        )
   }

return ( 
<>
    <div>
        <button className={styles.pokeballButton} onClick={()=> navigate(-1)} >
         <img className={styles.pokeballImg} src={PokeballImg} alt="Pokeball"/>Go back
        </button>
        <div className={styles.pokemon}>
           <main className={styles.pokemonInfo}>
                <div className={styles.pokemonTitle}>{pokemon?.name.toUpperCase()}</div>
                <div>Nr. {pokemon?.id}</div>
                <div>
                   <img className={styles.pokemonInfoImg} src={pokemon?.imgSrc} alt={pokemon?.name} />
                </div>
                <div>HP: {pokemon?.hp}</div>
                <div>ATT: {pokemon?.attack}</div>
                <div>DEF: {pokemon?.defense}</div>
            </main>
        </div>
        <Footer/>
    </div>
        </>
        )
};

export default Pokimon; 