import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { cores } from '../theme';

type Props = { valor: string; aoMudar: (texto: string) => void };

export default function BarraBusca({ valor, aoMudar }: Props) {
  return (
    <View style={estilos.caixa}>
      <TextInput
        style={estilos.input}
        value={valor}
        onChangeText={aoMudar}
        placeholder="Buscar produto"
        placeholderTextColor={cores.textoSuave}
        autoCorrect={false}
        returnKeyType="search"
      />
      {valor.length > 0 && (
        <Pressable onPress={() => aoMudar('')} accessibilityLabel="Limpar busca" hitSlop={10}>
          <Text style={estilos.limpar}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  caixa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 12,
    flex: 1,
    paddingHorizontal: 14,
  },
  input: { flex: 1, paddingVertical: 11, fontSize: 16, color: cores.tinta },
  limpar: { fontSize: 16, color: cores.textoSuave, paddingLeft: 8 },
});