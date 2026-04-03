import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fetchPokemonCount, fetchPokemonsByIds } from './src/services';
import { generateRandomPokemonIds } from './src/utils';

export default function App() {
  const [pokemonCount, setPokemonCount] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [lastLoadedIds, setLastLoadedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadPokemons = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      let total = pokemonCount;

      if (total === null) {
        total = await fetchPokemonCount();
        setPokemonCount(total);
      }

      const randomIds = generateRandomPokemonIds(total, lastLoadedIds, 5);
      const pokemons = await fetchPokemonsByIds(randomIds);

      setPokemonList(pokemons);
      setLastLoadedIds(randomIds);
    } catch (error) {
      console.error(error);
      setErrorMessage("Impossible de charger les Pokemon pour l'instant.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mini Pokedex</Text>

      {isLoading ? <ActivityIndicator size="large" /> : null}

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      {!isLoading && !errorMessage ? (
        <View style={styles.list}>
          {pokemonList.map((pokemon) => (
            <View key={pokemon.id} style={styles.buttonWrapper}>
              <Button title={pokemon.name} onPress={() => {}} />
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.reloadButton}>
        <Button
          title="Charger 5 autres Pokemon"
          onPress={loadPokemons}
          disabled={isLoading}
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginBottom: 12,
  },
  reloadButton: {
    marginTop: 12,
  },
  error: {
    color: '#b00020',
    textAlign: 'center',
    marginBottom: 12,
  },
});
