import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pokedex } from '../../components/Pokedex/Pokedex';
import { loadRandomPokemonBatch } from '../../services';
import { getFavoritesPokemon, toggleFavoritePokemon } from '../../services/authService';
import { styleHomeScreen } from './StyleHomeScreen';

export default function HomeScreen({ onPokemonPress = () => {} }) {
  const [totalPokemonCount, setTotalPokemonCount] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [favoritePokemonIds, setFavoritePokemonIds] = useState([]);
  const [previousPokemonIds, setPreviousPokemonIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadPokemons = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const { totalPokemonCount: nextTotalCount, pokemonIds, pokemons } =
        await loadRandomPokemonBatch({
          previousPokemonIds,
          knownPokemonCount: totalPokemonCount,
        });

      setTotalPokemonCount(nextTotalCount);
      setPreviousPokemonIds(pokemonIds);
      setPokemonList(pokemons);
    } catch (error) {
      console.error(error);
      setErrorMessage("Impossible de charger les Pokemon pour l'instant.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeHomeScreen = async () => {
      try {
        const favorites = await getFavoritesPokemon();
        setFavoritePokemonIds(favorites);
      } catch (error) {
        console.error(error);
      }

      await loadPokemons();
    };

    initializeHomeScreen();
  }, []);

  const handleToggleFavorite = async (pokemonId) => {
    try {
      const nextFavorites = await toggleFavoritePokemon(pokemonId);
      setFavoritePokemonIds(nextFavorites);
    } catch (error) {
      console.error(error);
      setErrorMessage("Impossible de mettre a jour les favoris pour l'instant.");
    }
  };

  return (
    <SafeAreaView style={styleHomeScreen.container}>
      <ScrollView
        contentContainerStyle={styleHomeScreen.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styleHomeScreen.title}>Mini Pokedex</Text>
        <Text style={styleHomeScreen.subtitle}>Selection aleatoire facon ecran Pokedex</Text>

        {isLoading && pokemonList.length === 0 ? (
          <ActivityIndicator size="large" color="#EE4F49" style={styleHomeScreen.loader} />
        ) : null}

        {errorMessage ? <Text style={styleHomeScreen.error}>{errorMessage}</Text> : null}

        {(pokemonList.length > 0 || (!isLoading && !errorMessage)) ? (
          <Pokedex
            pokemons={pokemonList}
            favoritePokemonIds={favoritePokemonIds}
            onPokemonPress={onPokemonPress}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : null}

        <View style={styleHomeScreen.reloadButton}>
          <Button
            title={isLoading ? 'Chargement...' : 'Charger 5 autres Pokemon'}
            onPress={loadPokemons}
            disabled={isLoading}
            color="#D93A3F"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
