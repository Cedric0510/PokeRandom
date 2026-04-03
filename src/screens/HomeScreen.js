import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { loadRandomPokemonBatch } from '../services';

function formatPokemonName(name) {
  if (!name) {
    return '';
  }

  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function HomeScreen({ onPokemonPress = () => {} }) {
  const [totalPokemonCount, setTotalPokemonCount] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
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
    loadPokemons();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mini Pokedex</Text>

      {isLoading && pokemonList.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : null}

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      {pokemonList.length > 0 ? (
        <View style={styles.list}>
          {pokemonList.map((pokemon) => (
            <View key={pokemon.id} style={styles.buttonWrapper}>
              <Button
                title={formatPokemonName(pokemon.name)}
                onPress={() => onPokemonPress(pokemon.id)}
              />
            </View>
          ))}
        </View>
      ) : null}

      {!isLoading && pokemonList.length === 0 && !errorMessage ? (
        <Text style={styles.info}>Aucun Pokemon a afficher.</Text>
      ) : null}

      <View style={styles.reloadButton}>
        <Button
          title={isLoading ? 'Chargement...' : 'Charger 5 autres Pokemon'}
          onPress={loadPokemons}
          disabled={isLoading}
        />
      </View>
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
  info: {
    textAlign: 'center',
    marginBottom: 12,
  },
});
