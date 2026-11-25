import { FlatList, Text, StyleSheet } from 'react-native';
import { Produto } from '../types';
import { cores } from '../theme';
import CardProduto from './CardProduto';

type Props = {
  produtos: Produto[];
  aoSelecionar: (produto: Produto) => void;
  buscando?: boolean; // true quando há texto na busca
};

export default function ListaProdutos({ produtos, aoSelecionar, buscando = false }: Props) {
  return (
    <FlatList
      data={produtos}
      keyExtractor={(p) => p.id}
      renderItem={({ item }) => <CardProduto produto={item} aoPressionar={aoSelecionar} />}
      contentContainerStyle={estilos.conteudo}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <Text style={estilos.vazio}>
          {buscando
            ? 'Nenhum produto encontrado.'
            : 'Nenhum produto ainda. Toque no + para adicionar o primeiro.'}
        </Text>
      }
    />
  );
}

const estilos = StyleSheet.create({
  conteudo: { paddingHorizontal: 20, paddingBottom: 110 },
  vazio: { color: cores.textoSuave, fontSize: 15, textAlign: 'center', marginTop: 40 },
});