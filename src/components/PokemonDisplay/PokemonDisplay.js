import { Image, Pressable, Text, View } from 'react-native';
import { stylePokemonDisplay } from './StylePokemonDisplay';

function formatPokemonId(id) {
  return String(id).padStart(3, '0');
}

function formatPokemonName(name) {
  if (!name) {
    return '';
  }

  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getPokemonSprite(pokemon) {
  if (!pokemon || !pokemon.sprites) {
    return '';
  }

  return pokemon.sprites.front_default;
}

export function PokemonDisplay({
  pokemon,
  isFavorite = false,
  onPress = () => {},
  onToggleFavorite = () => {},
}) {
  const sprite = getPokemonSprite(pokemon);
  const displayName = formatPokemonName(pokemon?.name);

  return (
    <View style={stylePokemonDisplay.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Voir ${displayName}`}
        onPress={() => onPress(pokemon)}
        style={({ pressed }) => [
          stylePokemonDisplay.cardBody,
          pressed ? stylePokemonDisplay.cardPressed : null,
        ]}
      >
        <View style={stylePokemonDisplay.spriteRing}>
          {sprite ? (
            <Image
              source={{ uri: sprite }}
              style={stylePokemonDisplay.sprite}
              resizeMode="contain"
            />
          ) : (
            <View style={stylePokemonDisplay.spritePlaceholder} />
          )}
        </View>

        <Text numberOfLines={1} style={stylePokemonDisplay.name}>
          {displayName}
        </Text>
        <Text style={stylePokemonDisplay.id}>#{formatPokemonId(pokemon?.id)}</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          isFavorite
            ? `Retirer ${displayName} des favoris`
            : `Ajouter ${displayName} aux favoris`
        }
        onPress={() => onToggleFavorite(pokemon?.id)}
        style={({ pressed }) => [
          stylePokemonDisplay.favoriteButton,
          isFavorite ? stylePokemonDisplay.favoriteButtonActive : null,
          pressed ? stylePokemonDisplay.favoriteButtonPressed : null,
        ]}
      >
        <Text
          style={[
            stylePokemonDisplay.favoriteIcon,
            isFavorite ? stylePokemonDisplay.favoriteIconActive : null,
          ]}
        >
          {'\u2605'}
        </Text>
      </Pressable>
    </View>
  );
}
