import { useEffect, useState } from 'react';
import {
  Modal, View, Text, TextInput, Pressable, ScrollView, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Categoria, Produto } from '../types';
import { cores } from '../theme';
import { dataBRparaISO, isoParaDataBR, validadeValida } from '../utils/datas';
import SeletorCategoria from './SeletorCategoria';
import CampoValidade from './CampoValidade';

type Props = {
  produto: Produto | null; // null = fechado
  aoFechar: () => void;
  aoSalvar: (id: string, nome: string, quantidade: string, categoria: Categoria, validade?: string) => void;
  aoExcluir: (id: string) => void;
};

export default function ModalEditarProduto({ produto, aoFechar, aoSalvar, aoExcluir }: Props) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoria, setCategoria] = useState<Categoria>('Alimentos');
  const [validade, setValidade] = useState('');

  useEffect(() => {
    if (produto) {
      setNome(produto.nome);
      setQuantidade(produto.quantidade);
      setCategoria(produto.categoria);
      setValidade(isoParaDataBR(produto.validade));
    }
  }, [produto]);

  const podeSalvar = nome.trim().length > 0 && quantidade.trim().length > 0 && validadeValida(validade);

  return (
    <Modal visible={!!produto} transparent animationType="fade" onRequestClose={aoFechar}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={estilos.fundo}>
        <ScrollView contentContainerStyle={estilos.rolagem} keyboardShouldPersistTaps="handled">
          <View style={estilos.caixa}>
            <View style={estilos.cabecalho}>
              <Text style={estilos.titulo}>Editar produto</Text>
              <Pressable onPress={aoFechar} accessibilityLabel="Fechar" hitSlop={12}>
                <Text style={estilos.x}>✕</Text>
              </Pressable>
            </View>

            <Text style={estilos.rotulo}>Nome</Text>
            <TextInput style={estilos.input} value={nome} onChangeText={setNome} />

            <Text style={estilos.rotulo}>Categoria</Text>
            <SeletorCategoria valor={categoria} aoMudar={setCategoria} />

            <Text style={estilos.rotulo}>
              Quantidade{produto && produto.unidade !== '-' ? ` (${produto.unidade})` : ''}
            </Text>
            <TextInput
              style={estilos.input}
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="numeric"
            />

            <CampoValidade valor={validade} aoMudar={setValidade} />

            <View style={estilos.linha}>
              <Pressable
                style={[estilos.botao, estilos.botaoPerigo]}
                onPress={() => produto && aoExcluir(produto.id)}
              >
                <Text style={estilos.textoPerigo}>Excluir tudo</Text>
              </Pressable>
              <Pressable
                style={[estilos.botao, estilos.botaoPrimario, !podeSalvar && { opacity: 0.4 }]}
                disabled={!podeSalvar}
                onPress={() =>
                  produto &&
                  aoSalvar(produto.id, nome, quantidade, categoria, dataBRparaISO(validade) ?? undefined)
                }
              >
                <Text style={estilos.textoPrimario}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: 'rgba(23,48,45,0.45)' },
  rolagem: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  caixa: { backgroundColor: cores.superficie, borderRadius: 18, padding: 20 },
  cabecalho: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  titulo: { fontSize: 20, fontWeight: '800', color: cores.tinta },
  x: { fontSize: 20, color: cores.textoSuave },
  rotulo: { fontSize: 14, color: cores.textoSuave, marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: cores.borda, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, color: cores.tinta, marginBottom: 14,
  },
  linha: { flexDirection: 'row', gap: 10, marginTop: 6 },
  botao: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  botaoPrimario: { backgroundColor: cores.primaria },
  botaoPerigo: { borderWidth: 1, borderColor: cores.perigo },
  textoPrimario: { color: '#fff', fontWeight: '700', fontSize: 16 },
  textoPerigo: { color: cores.perigo, fontWeight: '700', fontSize: 16 },
});