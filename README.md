# PokeRandom

Mini projet React Native (Expo) autour de la PokeAPI.

## Fonctionnement actuel

- Ecran d'accueil avec affichage type Pokedex
- Chargement aleatoire d'un lot de Pokemon
- Ouverture d'une fiche detail Pokemon au clic
- Interface construite en React Native avec Expo
- Gestion des safe areas avec `react-native-safe-area-context`

## Prerequis

- Node.js
- npm
- Expo Go (mobile) ou emulateur Android/iOS

## Installation

```bash
npm install
```

## Variables d'environnement

Creer un fichier `.env` a la racine du projet avec :

```env
EXPO_PUBLIC_POKEAPI_BASE_URL=https://pokeapi.co/api/v2
```

Important :
- les variables utilisees dans l'app Expo doivent commencer par `EXPO_PUBLIC_`
- si le `.env` change, redemarrer le serveur Expo

## Lancer le projet

```bash
npm run start
```

## Scripts utiles

- `npm run start`
- `npm run android`
- `npm run ios`
- `npm run web`

## Structure de base

- `App.js` : point d'entree de l'application
- `src/screens` : ecrans `HomeScreen` et `DetailScreen`
- `src/components/Pokedex` : affichage du Pokedex sur l'accueil
- `src/components/PokemonDisplay` : carte d'un Pokemon dans la grille
- `src/components/DetailPokemon` : contenu de la fiche detail
- `src/services` : appels API et logique de chargement
- `src/utils` : fonctions utilitaires
