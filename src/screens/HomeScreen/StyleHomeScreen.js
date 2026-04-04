import { StyleSheet } from 'react-native';

export const styleHomeScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE2C9',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    color: '#7E1E1E',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 18,
    textAlign: 'center',
    color: '#8F5350',
    fontSize: 14,
  },
  reloadButton: {
    marginTop: 18,
  },
  error: {
    color: '#b00020',
    textAlign: 'center',
    marginBottom: 12,
  },
  loader: {
    marginVertical: 22,
  },
});