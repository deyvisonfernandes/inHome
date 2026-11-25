import { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filtro, Produto } from '../types';
import { cores } from '../theme';
import { useProdutos } from '../hooks/useProdutos';
import Navbar from '../components/Navbar';
import TituloPagina from '../components/TituloPagina';
import BarraBusca from '../components/BarraBusca';
import BotaoFiltro from '../components/BotaoFiltro';
import ListaProdutos from '../components/ListaProdutos';
import BotaoAdicionar from '../components/BotaoAdicionar';
import ModalEditarProduto from '../components/ModalEditarProduto';
import ModalAdicionarProduto from '../components/ModalAdicionarProduto';
import ModalConfirmarExclusao from '../components/ModalConfirmarExclusao';
import ModalFiltroCategoria from '../components/ModalFiltroCategoria';

// ignora maiúsculas e acentos: "feijao" encontra "Feijão"
const normalizar = (texto: string) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export default function PaginaInicial() {
  const { produtos, adicionar, editar, excluir } = useProdutos();
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [produtoParaExcluir, setProdutoParaExcluir] = useState<Produto | null>(null);
  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);
  const [modalFiltroAberto, setModalFiltroAberto] = useState(false);
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<Filtro>(null);

  // busca e filtro funcionam juntos
  const produtosFiltrados = useMemo(() => {
    const termo = normalizar(busca);
    let lista = produtos.filter(
      (p) =>
        (filtro === null || filtro === 'vencimento' || p.categoria === filtro) &&
        (!termo || normalizar(p.nome).includes(termo))
    );
    if (filtro === 'vencimento') {
      // só produtos com validade, do mais perto de vencer ao mais longe
      lista = lista.filter((p) => p.validade).sort((a, b) => a.validade!.localeCompare(b.validade!));
    }
    return lista;
  }, [produtos, busca, filtro]);

  return (
    <SafeAreaView style={estilos.tela} edges={['top', 'left', 'right']}>
      <Navbar />
      <View style={estilos.conteudo}>
        <TituloPagina />

        <View style={estilos.linhaBusca}>
          <BarraBusca valor={busca} aoMudar={setBusca} />
          <BotaoFiltro filtroAtivo={filtro} aoPressionar={() => setModalFiltroAberto(true)} />
        </View>

        <ListaProdutos
          produtos={produtosFiltrados}
          aoSelecionar={setProdutoSelecionado}
          buscando={busca.trim().length > 0 || filtro !== null}
        />
        <BotaoAdicionar aoPressionar={() => setModalAdicionarAberto(true)} />
      </View>

      <ModalFiltroCategoria
        visivel={modalFiltroAberto}
        filtroAtivo={filtro}
        aoEscolher={(novoFiltro) => {
          setFiltro(novoFiltro);
          setModalFiltroAberto(false);
        }}
        aoFechar={() => setModalFiltroAberto(false)}
      />

      <ModalEditarProduto
        produto={produtoSelecionado}
        aoFechar={() => setProdutoSelecionado(null)}
        aoSalvar={(id, nome, qtd, cat, validade) => {
          editar(id, nome, qtd, cat, validade);
          setProdutoSelecionado(null);
        }}
        aoExcluir={() => {
          // fecha a edição e abre a confirmação
          setProdutoParaExcluir(produtoSelecionado);
          setProdutoSelecionado(null);
        }}
      />

      <ModalConfirmarExclusao
        produto={produtoParaExcluir}
        aoCancelar={() => setProdutoParaExcluir(null)}
        aoConfirmar={(id) => {
          excluir(id);
          setProdutoParaExcluir(null);
        }}
      />

      <ModalAdicionarProduto
        visivel={modalAdicionarAberto}
        aoCancelar={() => setModalAdicionarAberto(false)}
        aoAdicionar={(nome, qtd, un, cat, validade) => {
          adicionar(nome, qtd, un, cat, validade);
          setModalAdicionarAberto(false);
        }}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.primaria }, // a área do topo (entalhe) fica verde junto com a navbar
  conteudo: { flex: 1, backgroundColor: cores.fundo },
  linhaBusca: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 14,
  },
});