import { Text, StyleSheet } from 'react-native';
import { cores } from '../theme';

export default function TituloPagina() {
  return <Text style={estilos.titulo}>O que tem em casa?</Text>;
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: cores.tinta,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
});