import { Pressable, View, StyleSheet } from 'react-native';
import { Filtro } from '../types';
import { cores } from '../theme';
import { INFO_CATEGORIA } from '../constants/categorias';

type Props = { filtroAtivo: Filtro; aoPressionar: () => void };

export default function BotaoFiltro({ filtroAtivo, aoPressionar }: Props) {
  const corAtiva = filtroAtivo
    ? filtroAtivo === 'vencimento'
      ? cores.alerta
      : INFO_CATEGORIA[filtroAtivo].cor
    : null;
  const corLinhas = corAtiva ?? cores.tinta;

  return (
    <Pressable
      onPress={aoPressionar}
      accessibilityLabel="Filtrar produtos"
      style={({ pressed }) => [
        estilos.botao,
        corAtiva && { borderColor: corAtiva, backgroundColor: corAtiva + '22' },
        pressed && { opacity: 0.7 },
      ]}
    >
      {/* ícone de filtro: três linhas decrescentes */}
      <View style={[estilos.linha, { width: 20, backgroundColor: corLinhas }]} />
      <View style={[estilos.linha, { width: 13, backgroundColor: corLinhas }]} />
      <View style={[estilos.linha, { width: 6, backgroundColor: corLinhas }]} />
      {corAtiva && <View style={[estilos.ponto, { backgroundColor: corAtiva }]} />}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 12,
  },
  linha: { height: 2.5, borderRadius: 2 },
  ponto: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: cores.superficie,
  },
});