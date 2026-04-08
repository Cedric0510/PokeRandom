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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#7E1E1E',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 18,
    color: '#8F5350',
    fontSize: 14,
  },
  logoutButton: {
    marginTop: 2,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#E84C44',
    boxShadow: '0px 8px 14px rgba(143, 35, 33, 0.18)',
  },
  logoutButtonText: {
    color: '#FFF7F2',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.4,
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
