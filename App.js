import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DetailScreen, HomeScreen } from './src/screens';
import { AuthForm } from './src/components/AuthForm/AuthForm';
import { authenticate, getAuthenticatedUser, logout } from './src/services/authService';

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const authenticatedUser = await getAuthenticatedUser();
        setIsAuthenticated(Boolean(authenticatedUser));
      } catch (error) {
        console.error(error);
      } finally {
        setIsCheckingSession(false);
      }
    };

    restoreSession();
  }, []);

  const handleAuthSubmit = async (username) => {
    const normalizedUsername =
      typeof username === 'string' ? username.trim() : '';

    if (!normalizedUsername) {
      setAuthErrorMessage("Username is required.");
      return;
    }

    try {
      await authenticate(normalizedUsername);
      setAuthErrorMessage(null);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setAuthErrorMessage("Impossible d'enregistrer la session.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setSelectedPokemon(null);
      setIsAuthenticated(false);
      setAuthErrorMessage(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (isCheckingSession) {
    return null;
  }

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
      <HomeScreen
        onPokemonPress={setSelectedPokemon}
        onLogout={handleLogout}
      />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
