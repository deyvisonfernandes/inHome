import { useState } from 'react';
import {
  Modal, View, Text, TextInput, Pressable, ScrollView, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Categoria, Unidade } from '../types';
import { cores } from '../theme';
import { dataBRparaISO, validadeValida } from '../utils/datas';
import SeletorCategoria from './SeletorCategoria';
import CampoValidade from './CampoValidade';

type Props = {
  visivel: boolean;
  aoCancelar: () => void;
  aoAdicionar: (
    nome: string,
    quantidade: string,
    unidade: Unidade,
    categoria: Categoria,
    validade?: string
  ) => void;
};

const UNIDADES: Unidade[] = ['-', 'gramas', 'kilos'];

export default function ModalAdicionarProduto({ visivel, aoCancelar, aoAdicionar }: Props) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState<Unidade>('-');
  const [categoria, setCategoria] = useState<Categoria>('Alimentos');
  const [validade, setValidade] = useState('');

  const limpar = () => {
    setNome('');
    setQuantidade('');
    setUnidade('-');
    setCategoria('Alimentos');
    setValidade('');
  };

  const cancelar = () => {
    limpar();
    aoCancelar();
  };

  const adicionar = () => {
    aoAdicionar(nome, quantidade, unidade, categoria, dataBRparaISO(validade) ?? undefined);
    limpar();
  };

  const podeAdicionar = nome.trim().length > 0 && quantidade.trim().length > 0 && validadeValida(validade);

  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={cancelar}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={estilos.fundo}>
        <ScrollView contentContainerStyle={estilos.rolagem} keyboardShouldPersistTaps="handled">
          <View style={estilos.caixa}>
            <Text style={estilos.titulo}>Adicionar produto</Text>

            <Text style={estilos.rotulo}>Nome do produto</Text>
            <TextInput style={estilos.input} value={nome} onChangeText={setNome} placeholder="Ex.: Arroz" />

            <Text style={estilos.rotulo}>Categoria</Text>
            <SeletorCategoria valor={categoria} aoMudar={setCategoria} />

            <Text style={estilos.rotulo}>Quantidade</Text>
            <View style={estilos.linhaQtd}>
              <TextInput
                style={[estilos.input, { flex: 1, marginBottom: 0 }]}
                value={quantidade}
                onChangeText={setQuantidade}
                keyboardType="numeric"
                placeholder="0"
              />
              <View style={estilos.seletor}>
                {UNIDADES.map((u) => (
                  <Pressable
                    key={u}
                    onPress={() => setUnidade(u)}
                    style={[estilos.opcao, unidade === u && estilos.opcaoAtiva]}
                  >
                    <Text style={[estilos.opcaoTexto, unidade === u && { color: '#fff' }]}>{u}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <CampoValidade valor={validade} aoMudar={setValidade} />

            <View style={estilos.linha}>
              <Pressable style={[estilos.botao, estilos.botaoSecundario]} onPress={cancelar}>
                <Text style={estilos.textoSecundario}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[estilos.botao, estilos.botaoPrimario, !podeAdicionar && { opacity: 0.4 }]}
                disabled={!podeAdicionar}
                onPress={adicionar}
              >
                <Text style={estilos.textoPrimario}>Adicionar</Text>
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
  titulo: { fontSize: 20, fontWeight: '800', color: cores.tinta, marginBottom: 16 },
  rotulo: { fontSize: 14, color: cores.textoSuave, marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: cores.borda, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, color: cores.tinta, marginBottom: 14,
  },
  linhaQtd: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  seletor: { flexDirection: 'row', borderWidth: 1, borderColor: cores.borda, borderRadius: 10, overflow: 'hidden' },
  opcao: { paddingVertical: 11, paddingHorizontal: 10 },
  opcaoAtiva: { backgroundColor: cores.primaria },
  opcaoTexto: { fontSize: 14, color: cores.tinta },
  linha: { flexDirection: 'row', gap: 10, marginTop: 6 },
  botao: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  botaoPrimario: { backgroundColor: cores.primaria },
  botaoSecundario: { borderWidth: 1, borderColor: cores.borda },
  textoPrimario: { color: '#fff', fontWeight: '700', fontSize: 16 },
  textoSecundario: { color: cores.tinta, fontWeight: '600', fontSize: 16 },
});