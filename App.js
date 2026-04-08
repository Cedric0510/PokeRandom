import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DetailScreen, HomeScreen } from './src/screens';
import { AuthForm } from './src/components/AuthForm/AuthForm';
import { authenticate } from './src/services/authService';

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState(null);

  const handleAuthSubmit = (username) => {
    if (!username) {
      setAuthErrorMessage("Username is required.");
      return;
    }
    authenticate(username);
    setAuthErrorMessage(null);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AuthForm onSubmit={handleAuthSubmit} errorMessage={authErrorMessage} />
  }

  if (selectedPokemon) {
    return (
      <SafeAreaProvider>
        <DetailScreen
          pokemon={selectedPokemon}
          onBack={() => setSelectedPokemon(null)}
        />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <HomeScreen onPokemonPress={setSelectedPokemon} />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
