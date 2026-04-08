import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_FAVORITE_POKEMON = 5;
const FAVORITE_POKEMON_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

function buildFavoritePokemonKey(username) {
  return `favoritePokemon:${username}`;
}

async function cleanupFavoritePokemonStorage(currentUsername) {
  const storageKeys = await AsyncStorage.getAllKeys();
  const keysToRemove = storageKeys.filter((key) => {
    const isLegacyFavoriteKey = key === 'favoritePokemon';
    const isOtherFavoriteKey =
      key.startsWith('favoritePokemon:') &&
      key !== buildFavoritePokemonKey(currentUsername);

    return isLegacyFavoriteKey || isOtherFavoriteKey;
  });

  if (keysToRemove.length > 0) {
    await AsyncStorage.multiRemove(keysToRemove);
  }
}

function normalizeFavoritePokemonIds(pokemonIds) {
  if (!Array.isArray(pokemonIds)) {
    return [];
  }

  const uniquePokemonIds = pokemonIds.filter(
    (pokemonId, index) =>
      Number.isInteger(pokemonId) && pokemonIds.indexOf(pokemonId) === index
  );

  return uniquePokemonIds.slice(-MAX_FAVORITE_POKEMON);
}

function isFavoritePokemonEntryExpired(entry) {
  if (!entry?.expiresAt) {
    return false;
  }

  const expiresAt = Date.parse(entry.expiresAt);

  return Number.isFinite(expiresAt) && Date.now() >= expiresAt;
}

function buildFavoritePokemonEntry(username, pokemonIds = []) {
  return {
    username,
    pokemons: normalizeFavoritePokemonIds(pokemonIds),
    expiresAt: new Date(Date.now() + FAVORITE_POKEMON_DURATION_MS).toISOString(),
  };
}

async function writeFavoritePokemonEntry(entry) {
  const storageKey = buildFavoritePokemonKey(entry.username);
  await AsyncStorage.setItem(storageKey, JSON.stringify(entry));
}

async function readFavoritePokemonEntry() {
  const authenticatedUser = await getAuthenticatedUser();

  if (!authenticatedUser) {
    throw new Error('User must be authenticated to access favorite Pokemon.');
  }

  await cleanupFavoritePokemonStorage(authenticatedUser.username);

  const storageKey = buildFavoritePokemonKey(authenticatedUser.username);
  const rawFavorites = await AsyncStorage.getItem(storageKey);

  if (!rawFavorites) {
    const emptyEntry = buildFavoritePokemonEntry(authenticatedUser.username, []);

    await writeFavoritePokemonEntry(emptyEntry);
    return emptyEntry;
  }

  try {
    const parsedFavorites = JSON.parse(rawFavorites);
    const normalizedFavorites = normalizeFavoritePokemonIds(parsedFavorites?.pokemons);

    if (
      parsedFavorites?.username !== authenticatedUser.username ||
      !Array.isArray(parsedFavorites?.pokemons)
    ) {
      throw new Error('Invalid favorite Pokemon storage.');
    }

    if (isFavoritePokemonEntryExpired(parsedFavorites)) {
      const resetEntry = buildFavoritePokemonEntry(authenticatedUser.username, []);
      await writeFavoritePokemonEntry(resetEntry);
      return resetEntry;
    }

    if (
      normalizedFavorites.length !== parsedFavorites.pokemons.length ||
      typeof parsedFavorites.expiresAt !== 'string'
    ) {
      const normalizedEntry = {
        ...buildFavoritePokemonEntry(authenticatedUser.username, normalizedFavorites),
        expiresAt:
          typeof parsedFavorites.expiresAt === 'string'
            ? parsedFavorites.expiresAt
            : new Date(Date.now() + FAVORITE_POKEMON_DURATION_MS).toISOString(),
      };

      await writeFavoritePokemonEntry(normalizedEntry);
      return normalizedEntry;
    }

    return parsedFavorites;
  } catch (error) {
    const resetEntry = buildFavoritePokemonEntry(authenticatedUser.username, []);

    await writeFavoritePokemonEntry(resetEntry);
    return resetEntry;
  }
}

export async function authenticate(username) {
  await AsyncStorage.setItem('isAuthenticated', 'true');
  await AsyncStorage.setItem('username', username);
  await cleanupFavoritePokemonStorage(username);
  await setMemorizeFavoritesPokemonStorage();
}

export async function getAuthenticatedUser() {
  const [isAuthenticated, username] = await Promise.all([
    AsyncStorage.getItem('isAuthenticated'),
    AsyncStorage.getItem('username'),
  ]);

  return isAuthenticated === 'true' && username ? { username } : null;
}

export async function logout() {
  const authenticatedUser = await getAuthenticatedUser();

  if (!authenticatedUser) {
    throw new Error('No user is currently authenticated.');
  }

  await AsyncStorage.multiRemove(['isAuthenticated', 'username']);
}

export async function setMemorizeFavoritesPokemonStorage() {
  const authenticatedUser = await getAuthenticatedUser();

  if (!authenticatedUser) {
    throw new Error('User must be authenticated to save favorite Pokemon.');
  }

  const existingFavorites = await readFavoritePokemonEntry();

  await writeFavoritePokemonEntry({
    username: authenticatedUser.username,
    pokemons: existingFavorites.pokemons,
    expiresAt: existingFavorites.expiresAt,
  });
}

export async function getFavoritesPokemon() {
  const favoriteEntry = await readFavoritePokemonEntry();
  return favoriteEntry.pokemons;
}

export async function isFavoritePokemon(pokemonId) {
  const favorites = await getFavoritesPokemon();
  return favorites.includes(pokemonId);
}

export async function addFavoritePokemon(pokemonId) {
  const favoriteEntry = await readFavoritePokemonEntry();

  if (favoriteEntry.pokemons.includes(pokemonId)) {
    return favoriteEntry.pokemons;
  }

  const nextFavorites = normalizeFavoritePokemonIds([
    ...favoriteEntry.pokemons,
    pokemonId,
  ]);

  await writeFavoritePokemonEntry(
    buildFavoritePokemonEntry(favoriteEntry.username, nextFavorites)
  );

  return nextFavorites;
}

export async function removeFavoritePokemon(pokemonId) {
  const favoriteEntry = await readFavoritePokemonEntry();
  const nextFavorites = favoriteEntry.pokemons.filter((id) => id !== pokemonId);

  await writeFavoritePokemonEntry(
    buildFavoritePokemonEntry(favoriteEntry.username, nextFavorites)
  );

  return nextFavorites;
}

export async function toggleFavoritePokemon(pokemonId) {
  return (await isFavoritePokemon(pokemonId))
    ? removeFavoritePokemon(pokemonId)
    : addFavoritePokemon(pokemonId);
}
