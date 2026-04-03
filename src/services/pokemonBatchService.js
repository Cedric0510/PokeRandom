import { DEFAULT_POKEMON_BATCH_SIZE, generateRandomPokemonIds } from '../utils';
import { fetchPokemonCount, fetchPokemonsByIds } from './pokeapiService';

export async function loadRandomPokemonBatch({
  previousPokemonIds = [],
  knownPokemonCount = null,
  batchSize = DEFAULT_POKEMON_BATCH_SIZE,
} = {}) {
  let totalPokemonCount = knownPokemonCount;

  if (!Number.isInteger(totalPokemonCount) || totalPokemonCount < 1) {
    totalPokemonCount = await fetchPokemonCount();
  }

  const pokemonIds = generateRandomPokemonIds(
    totalPokemonCount,
    previousPokemonIds,
    batchSize
  );

  if (pokemonIds.length === 0) {
    throw new Error('Unable to generate pokemon ids.');
  }

  const pokemons = await fetchPokemonsByIds(pokemonIds);

  return {
    totalPokemonCount,
    pokemonIds,
    pokemons,
  };
}
