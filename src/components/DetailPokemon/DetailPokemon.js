import { Image, Text, View } from 'react-native';
import { styleDetailPokemon } from './StyleDetailPokemon';

const TYPE_COLORS = {
  grass: '#59B45C',
  poison: '#9A58B5',
  fire: '#F18244',
  water: '#4A9AE2',
  electric: '#E3C13B',
  bug: '#8AB24A',
  normal: '#AAA67F',
  flying: '#8FA8DD',
  ground: '#C8A146',
  fairy: '#D98BBE',
  fighting: '#C25A47',
  psychic: '#E86D9C',
  rock: '#B79B47',
  steel: '#8D8FB0',
  ice: '#79C9C8',
  ghost: '#6E5D96',
  dragon: '#5F77D8',
  dark: '#705746',
};

export function DetailPokemon({ pokemon }) {
  const displayName = pokemon.name;
  const artwork = pokemon.sprites.other['official-artwork'].front_default;
  const thumbs = [
    pokemon.sprites.front_default,
    pokemon.sprites.front_shiny,
  ].filter(Boolean);
  const category = pokemon.types[0].type.name;
  const description = `Main stats: ${pokemon.stats
    .slice(0, 2)
    .map((stat) => `${stat.stat.name} ${stat.base_stat}`)
    .join(' | ')}.`;
  const pokemonId = `#${pokemon.id}`;
  const height = pokemon.height;
  const weight = pokemon.weight;

  return (
    <View style={styleDetailPokemon.card}>
      <View style={styleDetailPokemon.heroPanel}>
        <Text style={styleDetailPokemon.title}>{displayName}</Text>
        <View style={styleDetailPokemon.divider} />

        <View style={styleDetailPokemon.artworkFrame}>
          {artwork ? (
            <Image
              source={{ uri: artwork }}
              resizeMode="contain"
              style={styleDetailPokemon.artwork}
            />
          ) : (
            <View style={styleDetailPokemon.artworkPlaceholder} />
          )}
        </View>
      </View>

      <View style={styleDetailPokemon.bottomGrid}>
        <View style={styleDetailPokemon.infoPanel}>
          <Text style={styleDetailPokemon.genus}>{category}</Text>

          <View style={styleDetailPokemon.metaRow}>
            <Text style={styleDetailPokemon.metaId}>{pokemonId}</Text>

            <View style={styleDetailPokemon.typeRow}>
              {pokemon.types?.map(({ type }) => (
                <View
                  key={type.name}
                  style={[
                    styleDetailPokemon.typeBadge,
                    { backgroundColor: TYPE_COLORS[type.name] || '#6A8C85' },
                  ]}
                >
                  <Text style={styleDetailPokemon.typeBadgeText}>
                    {type.name.toUpperCase()}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <Text style={styleDetailPokemon.measurements}>
            Height: {height} | Weight: {weight}
          </Text>
        </View>

        <View style={styleDetailPokemon.notesPanel}>
          <View style={styleDetailPokemon.thumbRow}>
            {thumbs.map((thumb, index) => (
              <View key={`${thumb}-${index}`} style={styleDetailPokemon.thumbFrame}>
                <Image
                  source={{ uri: thumb }}
                  resizeMode="contain"
                  style={styleDetailPokemon.thumbImage}
                />
              </View>
            ))}
          </View>

          <Text style={styleDetailPokemon.flavorText}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
}
