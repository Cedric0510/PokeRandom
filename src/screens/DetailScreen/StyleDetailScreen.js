import { StyleSheet } from 'react-native';

export const styleDetailScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE2C9',
  },
  content: {
    padding: 14,
    paddingBottom: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 14,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: '#D64642',
  },
  backButtonText: {
    color: '#FFF8EB',
    fontSize: 13,
    fontWeight: '800',
  },
  loader: {
    marginTop: 28,
  },
  error: {
    marginTop: 20,
    color: '#B00020',
    textAlign: 'center',
    fontWeight: '700',
  },
});
