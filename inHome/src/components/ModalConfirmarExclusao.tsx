import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { Produto } from '../types';
import { cores } from '../theme';

type Props = {
  produto: Produto | null; // null = fechado
  aoCancelar: () => void;
  aoConfirmar: (id: string) => void;
};

export default function ModalConfirmarExclusao({ produto, aoCancelar, aoConfirmar }: Props) {
  return (
    <Modal visible={!!produto} transparent animationType="fade" onRequestClose={aoCancelar}>
      <View style={estilos.fundo}>
        <View style={estilos.caixa}>
          <Text style={estilos.titulo}>Excluir produto?</Text>
          <Text style={estilos.texto}>
            "{produto?.nome}" será removido da sua lista. Essa ação não pode ser desfeita.
          </Text>

          <View style={estilos.linha}>
            <Pressable style={[estilos.botao, estilos.botaoSecundario]} onPress={aoCancelar}>
              <Text style={estilos.textoSecundario}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[estilos.botao, estilos.botaoPerigo]}
              onPress={() => produto && aoConfirmar(produto.id)}
            >
              <Text style={estilos.textoPerigo}>Excluir</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: 'rgba(23,48,45,0.45)', justifyContent: 'center', padding: 24 },
  caixa: { backgroundColor: cores.superficie, borderRadius: 18, padding: 20 },
  titulo: { fontSize: 20, fontWeight: '800', color: cores.tinta, marginBottom: 10 },
  texto: { fontSize: 15, color: cores.textoSuave, lineHeight: 22, marginBottom: 20 },
  linha: { flexDirection: 'row', gap: 10 },
  botao: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  botaoSecundario: { borderWidth: 1, borderColor: cores.borda },
  botaoPerigo: { backgroundColor: cores.perigo },
  textoSecundario: { color: cores.tinta, fontWeight: '600', fontSize: 16 },
  textoPerigo: { color: '#fff', fontWeight: '700', fontSize: 16 },
});