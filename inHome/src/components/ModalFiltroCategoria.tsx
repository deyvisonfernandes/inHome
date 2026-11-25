import { Modal, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Filtro } from '../types';
import { cores } from '../theme';
import { CATEGORIAS, INFO_CATEGORIA } from '../constants/categorias';

type Props = {
  visivel: boolean;
  filtroAtivo: Filtro; // null = todas
  aoEscolher: (filtro: Filtro) => void;
  aoFechar: () => void;
};

export default function ModalFiltroCategoria({ visivel, filtroAtivo, aoEscolher, aoFechar }: Props) {
  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={aoFechar}>
      {/* toque fora da caixa fecha o pop up */}
      <Pressable style={estilos.fundo} onPress={aoFechar}>
        <Pressable style={estilos.caixa} onPress={() => {}}>
          <Text style={estilos.titulo}>Filtrar produtos</Text>

          <Pressable style={estilos.opcao} onPress={() => aoEscolher(null)}>
            <View style={estilos.semIcone} />
            <Text style={[estilos.nome, filtroAtivo === null && estilos.nomeAtivo]}>Todas as categorias</Text>
            {filtroAtivo === null && <Text style={estilos.check}>✓</Text>}
          </Pressable>

          {CATEGORIAS.map((c) => {
            const { cor, imagem } = INFO_CATEGORIA[c];
            const ativa = filtroAtivo === c;
            return (
              <Pressable
                key={c}
                style={[estilos.opcao, ativa && { backgroundColor: cor + '22' }]}
                onPress={() => aoEscolher(c)}
              >
                <Image source={imagem} style={estilos.icone} resizeMode="contain" />
                <Text style={[estilos.nome, ativa && estilos.nomeAtivo]}>{c}</Text>
                {ativa && <Text style={[estilos.check, { color: cor }]}>✓</Text>}
              </Pressable>
            );
          })}

          <View style={estilos.divisor} />

          <Pressable
            style={[estilos.opcao, filtroAtivo === 'vencimento' && { backgroundColor: cores.alerta + '22' }]}
            onPress={() => aoEscolher('vencimento')}
          >
            <Text style={estilos.emoji}>⏳</Text>
            <View style={{ flex: 1 }}>
              <Text style={[estilos.nome, filtroAtivo === 'vencimento' && estilos.nomeAtivo]}>Prestes a vencer</Text>
              <Text style={estilos.sub}>Do mais perto de vencer ao mais longe</Text>
            </View>
            {filtroAtivo === 'vencimento' && <Text style={[estilos.check, { color: cores.alerta }]}>✓</Text>}
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: 'rgba(23,48,45,0.45)', justifyContent: 'center', padding: 24 },
  caixa: { backgroundColor: cores.superficie, borderRadius: 18, padding: 16 },
  titulo: { fontSize: 20, fontWeight: '800', color: cores.tinta, marginBottom: 10, paddingHorizontal: 4 },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  icone: { width: 28, height: 28, marginRight: 12 },
  semIcone: { width: 28, height: 28, marginRight: 12 },
  emoji: { width: 28, fontSize: 20, textAlign: 'center', marginRight: 12 },
  nome: { flex: 1, fontSize: 16, color: cores.tinta },
  nomeAtivo: { fontWeight: '700' },
  sub: { fontSize: 13, color: cores.textoSuave, marginTop: 2 },
  check: { fontSize: 18, fontWeight: '700', color: cores.primaria },
  divisor: { height: 1, backgroundColor: cores.borda, marginVertical: 6 },
});