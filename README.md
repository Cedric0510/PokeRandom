# PokeRandom

Mini Pokedex React Native (Expo) pour TP junior.

## Lancer le projet

```bash
npm install
npm run start
```

## Structure simple du projet

```text
src/
  screens/
    HomeScreen.js        // UI + state de l'ecran principal
  services/
    pokeapiService.js    // appels API PokeAPI
    pokemonBatchService.js // logique commune: charger 5 pokemon aleatoires
  utils/
    pokemonRandom.js     // generation aleatoire sans doublon
```

## Regles deja implementees

- 5 Pokemon charges aleatoirement.
- Pas de doublon dans une meme liste de 5.
- Les 5 Pokemon de la liste precedente ne reapparaissent pas au rechargement suivant.
- Etats `loading` et `error` geres sur l'ecran principal.

## Point d'integration membre 2

- `App.js` passe `onPokemonPress` a `HomeScreen`.
- Il suffit de remplacer le `console.log` actuel par la navigation vers l'ecran detail.

