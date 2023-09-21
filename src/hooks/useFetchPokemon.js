import axios from "axios";
import { useEffect, useState } from "react";

import { API_URL, DEFAULT_IMG_URL } from '../constants/connection-urls';
export const useFetchPokemon = (next, isPlaying) => {
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchPokemon = async () => {
            setIsLoading(true);
            const handleGetNewId = () => {

                const range1 = [1, 1010];
                const range2 = [10001, 10270];

                let randomChoice = Math.random();

                if (randomChoice < 0.5) {
                    randomChoice = Math.round(Math.random() * (range1[1] - range1[0]) + range1[0]);
                } else {
                    randomChoice = Math.round(Math.random() * (range2[1] - range2[0]) + range2[0]);
                }

                return randomChoice;

            }

            const ID = handleGetNewId();

            await axios.get(`${API_URL}/${ID}`)
                .then((res) => {
                    if (res.status === 200) {
                        const pokemon = {
                            name: String(res.data.name).replace(/-/g, " ").split(" ")[0],
                            type: res.data.types[0].type.name,
                            image: `${DEFAULT_IMG_URL}${ID}.png`
                        }
                        setPokemon(pokemon);
                        console.log(pokemon.name);
                    }
                });
            setIsLoading(false);
        }

        fetchPokemon();

    }, [next, isPlaying]);

    return [pokemon, isLoading];
}