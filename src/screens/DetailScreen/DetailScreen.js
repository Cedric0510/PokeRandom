import {
  Pressable,
  ScrollView,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DetailPokemon } from '../../components/DetailPokemon/DetailPokemon';
import { styleDetailScreen } from './StyleDetailScreen';

export default function DetailScreen({ pokemon, onBack = () => {} }) {
  return (
    <SafeAreaView style={styleDetailScreen.container}>
      <ScrollView
        contentContainerStyle={styleDetailScreen.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={onBack} style={styleDetailScreen.backButton}>
          <Text style={styleDetailScreen.backButtonText}>Retour au Pokedex</Text>
        </Pressable>

        {pokemon ? (
          <DetailPokemon pokemon={pokemon} />
        ) : (
          <Text style={styleDetailScreen.error}>Aucun Pokemon selectionne.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
