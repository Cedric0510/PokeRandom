import { StyleSheet } from 'react-native';

export const stylePokemonDisplay = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '31%',
    minWidth: 92,
    marginBottom: 18,
    transform: [{ scale: 1 }],
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
  spriteRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#51B85A',
    shadowColor: '#0A5A45',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.24,
    shadowRadius: 10,
    elevation: 6,
  },
  sprite: {
    width: 72,
    height: 72,
  },
  spritePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  id: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '700',
    color: '#7C69A8',
    letterSpacing: 0.8,
    textShadowColor: 'rgba(225, 239, 255, 0.85)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 2,
  },
  name: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '800',
    color: '#09576A',
    maxWidth: 90,
    textAlign: 'center',
  },
});
