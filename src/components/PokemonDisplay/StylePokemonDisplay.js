import { StyleSheet } from 'react-native';

export const stylePokemonDisplay = StyleSheet.create({
  card: {
    position: 'relative',
    width: '31%',
    minWidth: 92,
    marginBottom: 18,
  },
  cardBody: {
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    boxShadow: '0px 8px 10px rgba(10, 90, 69, 0.24)',
    elevation: 6,
  },
  favoriteButton: {
    position: 'absolute',
    top: -6,
    right: 0,
    zIndex: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7DF',
    borderWidth: 2,
    borderColor: '#E7C56A',
    boxShadow: '0px 4px 6px rgba(152, 120, 29, 0.18)',
    elevation: 4,
  },
  favoriteButtonActive: {
    backgroundColor: '#FFD34D',
    borderColor: '#D89600',
  },
  favoriteButtonPressed: {
    transform: [{ scale: 0.94 }],
  },
  favoriteIcon: {
    fontSize: 18,
    fontWeight: '900',
    color: '#C8A74D',
    lineHeight: 20,
  },
  favoriteIconActive: {
    color: '#7A4A00',
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
    textShadow: '0px 1px 2px rgba(225, 239, 255, 0.85)',
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
