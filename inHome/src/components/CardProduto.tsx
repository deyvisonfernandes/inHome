import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { Produto } from '../types';
import { cores } from '../theme';
import { INFO_CATEGORIA } from '../constants/categorias';
import { diasAteVencer, isoParaDataBR } from '../utils/datas';

type Props = { produto: Produto; aoPressionar: (produto: Produto) => void };

function situacaoValidade(validade: string) {
  const dias = diasAteVencer(validade);
  if (dias < 0) return { texto: 'Vencido', cor: cores.perigo };
  if (dias === 0) return { texto: 'Vence hoje', cor: cores.perigo };
  if (dias <= 7) return { texto: `Vence em ${dias} dia${dias > 1 ? 's' : ''}`, cor: cores.alerta };
  return null;
}

export default function CardProduto({ produto, aoPressionar }: Props) {
  const data = new Date(produto.dataAdicao).toLocaleDateString('pt-BR');
  const unidade = produto.unidade === '-' ? '' : ` ${produto.unidade}`;
  const { cor, imagem } = INFO_CATEGORIA[produto.categoria];
  const situacao = produto.validade ? situacaoValidade(produto.validade) : null;

  return (
    <Pressable
      onPress={() => aoPressionar(produto)}
      style={({ pressed }) => [estilos.card, pressed && { opacity: 0.7 }]}
    >
      <View style={estilos.textos}>
        <Text style={estilos.nome}>{produto.nome}</Text>
        <Text style={estilos.detalhe}>Quantidade: {produto.quantidade}{unidade}</Text>
        <Text style={estilos.detalhe}>Adicionado em {data}</Text>
        {produto.validade && (
          <Text style={[estilos.detalhe, situacao && { color: situacao.cor, fontWeight: '700' }]}>
            Validade: {isoParaDataBR(produto.validade)}
            {situacao ? ` · ${situacao.texto}` : ''}
          </Text>
        )}
      </View>

      {/* canto direito: cor sutil da categoria + símbolo + setinha */}
      <View style={[estilos.lateral, { backgroundColor: cor + '22' }]}>
        <Image source={imagem} style={estilos.icone} resizeMode="contain" />
        <Text style={estilos.seta}>›</Text>
      </View>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: cores.superficie,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    marginBottom: 10,
    overflow: 'hidden', // a cor lateral acompanha os cantos arredondados
  },
  textos: { flex: 1, padding: 16 },
  nome: { fontSize: 17, fontWeight: '700', color: cores.tinta, marginBottom: 4 },
  detalhe: { fontSize: 14, color: cores.textoSuave },
  lateral: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 6,
  },
  icone: { width: 30, height: 30 },
  seta: { fontSize: 32, color: cores.primaria },
});