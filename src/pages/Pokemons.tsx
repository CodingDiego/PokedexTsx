import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPokemons } from "../api/fetchPokemons";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import { Pokemon } from "../types/types.d";
import styles from "../components/pokemons.module.css";
import { waitFor } from "../api/utils/utils";

const Pokemons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchAndSetAllPokemons = async () => {
      setIsLoading(true);
      await waitFor(500);
      const allPokemons = await fetchPokemons();
      setPokemons(allPokemons);
      setIsLoading(false);
    };
    fetchAndSetAllPokemons();
    
  }, []);

  if(isLoading || !pokemons){
    return <LoadingScreen/>
  }

    const filteredPokemons = pokemons?.slice(0, 157).filter((pokemon) => {
      return pokemon.name.toLowerCase().match(query.toLowerCase());
    });

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main>
        <nav>
          {filteredPokemons?.slice(0, 157).map((pokemon) => (
            <Link
              key={pokemon.id}
              className={styles.listItem}
              to={`/pokemons/${pokemon.name.toLowerCase()}`}
            >
              <img
                className={styles.listItemIcon}
                src={pokemon.imgSrc}
                alt={pokemon.name}
              />
              <div className={styles.listItemText}>
                <span>{pokemon.name}</span>
                <span>{pokemon.id}</span>
              </div>
            </Link>
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
};

export default Pokemons;
