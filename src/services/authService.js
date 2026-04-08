export function authenticate(username) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
    setMemorizeFavoritesPokemonStorage();
}

export function getAuthenticatedUser() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const username = localStorage.getItem('username');
    return isAuthenticated ? { username } : null;
}

export function logout() {
    if (!getAuthenticatedUser()) {
        throw new Error('No user is currently authenticated.');
    }
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
}

export function setMemorizeFavoritesPokemonStorage() {
    const authenticatedUser = getAuthenticatedUser();
    if (!authenticatedUser) {
        throw new Error('User must be authenticated to save favorite Pokemon.');
    }
    localStorage.setItem('favoritePokemon', JSON.stringify({username: authenticatedUser.username, pokemons: []}));
}

export function addFavoritePokemon(pokemonId) {
    const authenticatedUser = getAuthenticatedUser();
    if (!authenticatedUser) {
        throw new Error('User must be authenticated to add favorite Pokemon.');
    }
    localStorage.setItem('favoritePokemon', JSON.stringify({username: authenticatedUser.username, pokemons: [...getFavoritesPokemon(), pokemonId]}));
}

export function getFavoritesPokemon() {
    let favorites = localStorage.getItem('favoritePokemon');

    if (!favorites) {
        setMemorizeFavoritesPokemonStorage();
        favorites = localStorage.getItem('favoritePokemon');
    }

    if (favorites.username !== getAuthenticatedUser()?.username) {
        favorites = {username: getAuthenticatedUser()?.username, pokemons: []};
        localStorage.setItem('favoritePokemon', JSON.stringify(favorites));   
    }

    return JSON.parse(favorites.pokemons);
}