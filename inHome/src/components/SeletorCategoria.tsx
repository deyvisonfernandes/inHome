import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Categoria } from '../types';
import { cores } from '../theme';
import { CATEGORIAS, INFO_CATEGORIA } from '../constants/categorias';

type Props = { valor: Categoria; aoMudar: (categoria: Categoria) => void };

export default function SeletorCategoria({ valor, aoMudar }: Props) {
  return (
    <View style={estilos.container}>
      {CATEGORIAS.map((c) => {
        const ativa = valor === c;
        const cor = INFO_CATEGORIA[c].cor;
        return (
          <Pressable
            key={c}
            onPress={() => aoMudar(c)}
            style={[estilos.chip, { borderColor: cor }, ativa && { backgroundColor: cor }]}
          >
            <Text style={[estilos.texto, ativa && { color: '#fff' }]}>{c}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  chip: { borderWidth: 1.5, borderRadius: 20, paddingVertical: 7, paddingHorizontal: 14 },
  texto: { fontSize: 14, color: cores.tinta, fontWeight: '600' },
});