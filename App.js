import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens';

export default function App() {
  const handlePokemonPress = (pokemonId) => {
    // Future step: replace with navigation (member 2 integration)
    console.log('Pokemon selected:', pokemonId);
  };

  return (
    <>
      <HomeScreen onPokemonPress={handlePokemonPress} />
      <StatusBar style="auto" />
    </>
  );
}
