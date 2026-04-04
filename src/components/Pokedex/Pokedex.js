import { Text, View } from 'react-native';
import { PokemonDisplay } from '../PokemonDisplay/PokemonDisplay';
import { stylePokedex } from './StylePokedex';

export function Pokedex({ pokemons = [] }) {
  return (
    <View style={stylePokedex.wrapper}>
      <View style={stylePokedex.shell}>
        <View style={stylePokedex.topBar}>
          <View style={stylePokedex.camera} />

          <View style={stylePokedex.leftIndicators}>
            <View style={stylePokedex.leftIndicator} />
            <View style={stylePokedex.leftIndicator} />
            <View style={stylePokedex.leftIndicator} />
          </View>

          <View style={stylePokedex.rightIndicator} />
        </View>

        <View style={stylePokedex.screen}>
          <View style={stylePokedex.screenLineLeft} />
          <View style={stylePokedex.screenLineRight} />
          <View style={stylePokedex.arrow} />

          {pokemons.length > 0 ? (
            <View style={stylePokedex.grid}>
              {pokemons.map((pokemon) => (
                <PokemonDisplay key={pokemon.id} pokemon={pokemon} />
              ))}
            </View>
          ) : (
            <Text style={stylePokedex.emptyText}>Aucun Pokemon a afficher.</Text>
          )}
        </View>
      </View>
    </View>
  );
}
