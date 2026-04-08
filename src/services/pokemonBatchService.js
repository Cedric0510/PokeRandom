import { DEFAULT_POKEMON_BATCH_SIZE, generateRandomPokemonIds } from '../utils';
import { fetchPokemonCount, fetchPokemonsByIds } from './pokeapiService';

export async function loadRandomPokemonBatch({
  previousPokemonIds = [],
  hiddenPokemonIds = [],
  knownPokemonCount = null,
  batchSize = DEFAULT_POKEMON_BATCH_SIZE,
} = {}) {
  let totalPokemonCount = knownPokemonCount;

  if (!Number.isInteger(totalPokemonCount) || totalPokemonCount < 1) {
    totalPokemonCount = await fetchPokemonCount();
  }

  const excludedPokemonIds = [
    ...previousPokemonIds,
    ...hiddenPokemonIds,
  ];

  let pokemonIds = generateRandomPokemonIds(
    totalPokemonCount,
    excludedPokemonIds,
    batchSize
  );

  if (pokemonIds.some((pokemonId) => hiddenPokemonIds.includes(pokemonId))) {
    pokemonIds = generateRandomPokemonIds(
      totalPokemonCount,
      hiddenPokemonIds,
      batchSize
    );
  }

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
