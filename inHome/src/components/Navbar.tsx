import { View, Image, StyleSheet } from 'react-native';
import { cores } from '../theme';

// A logo fica em: assets/logo.png (raiz do projeto, ao lado do App.tsx)
// Para trocar, substitua o arquivo mantendo o nome "logo.png".
export default function Navbar() {
  return (
    <View style={estilos.barra}>
      <Image source={require('../../assets/logo.png')} style={estilos.logo} resizeMode="contain" />
    </View>
  );
}

const estilos = StyleSheet.create({
  barra: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.primaria,
  },
  logo: { height: 40, width: 140 },
});