import { Pressable, Text, StyleSheet } from 'react-native';
import { cores } from '../theme';

export default function BotaoAdicionar({ aoPressionar }: { aoPressionar: () => void }) {
  return (
    <Pressable
      onPress={aoPressionar}
      accessibilityLabel="Adicionar produto"
      style={({ pressed }) => [estilos.botao, pressed && { opacity: 0.85 }]}
    >
      <Text style={estilos.mais}>+</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: cores.primaria,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  mais: { color: '#fff', fontSize: 32, lineHeight: 34, fontWeight: '400' },
});