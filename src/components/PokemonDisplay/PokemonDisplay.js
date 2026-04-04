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

export function PokemonDisplay({ pokemon, onPress = () => {} }) {
    const sprite = getPokemonSprite(pokemon);
    const displayName = formatPokemonName(pokemon?.name);

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Voir ${displayName}`}
            onPress={() => onPress(pokemon)}
            style={({ pressed }) => [
                stylePokemonDisplay.card,
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
    );
}
