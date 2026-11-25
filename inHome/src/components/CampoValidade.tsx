import { Text, TextInput, StyleSheet } from 'react-native';
import { cores } from '../theme';
import { dataBRparaISO, mascararData } from '../utils/datas';

type Props = { valor: string; aoMudar: (texto: string) => void };

export default function CampoValidade({ valor, aoMudar }: Props) {
  const invalida = valor.length === 10 && dataBRparaISO(valor) === null;

  return (
    <>
      <Text style={estilos.rotulo}>Data de validade (opcional)</Text>
      <TextInput
        style={[estilos.input, invalida && { borderColor: cores.perigo }]}
        value={valor}
        onChangeText={(t) => aoMudar(mascararData(t))}
        keyboardType="numeric"
        placeholder="DD/MM/AAAA"
        placeholderTextColor={cores.textoSuave}
        maxLength={10}
      />
      {invalida && <Text style={estilos.erro}>Essa data não existe. Confira o dia e o mês.</Text>}
    </>
  );
}

const estilos = StyleSheet.create({
  rotulo: { fontSize: 14, color: cores.textoSuave, marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: cores.borda, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, color: cores.tinta, marginBottom: 14,
  },
  erro: { color: cores.perigo, fontSize: 13, marginTop: -8, marginBottom: 14 },
});