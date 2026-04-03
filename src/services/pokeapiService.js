const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

async function fetchFromPokeApi(path) {
  const response = await fetch(`${POKEAPI_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`PokeAPI request failed (${response.status}) for ${path}`);
  }

  return response.json();
}

export async function fetchPokemonCount() {
  const data = await fetchFromPokeApi('/pokemon?limit=1');
  return data.count;
}

export async function fetchPokemonById(id) {
  const pokemonId = Number(id);

  if (!Number.isInteger(pokemonId) || pokemonId < 1) {
    throw new Error('Pokemon id must be a positive integer.');
  }

  return fetchFromPokeApi(`/pokemon/${pokemonId}`);
}

export async function fetchPokemonsByIds(ids) {
  if (!Array.isArray(ids)) {
    throw new Error('Ids must be an array.');
  }

  return Promise.all(ids.map((id) => fetchPokemonById(id)));
}
