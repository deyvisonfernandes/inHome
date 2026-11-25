import AsyncStorage from '@react-native-async-storage/async-storage';
import { Produto } from '../types';

const CHAVE = '@o-que-tem-em-casa:produtos';

export async function carregarProdutos(): Promise<Produto[]> {
  try {
    const bruto = await AsyncStorage.getItem(CHAVE);
    if (!bruto) return [];
    const lista = JSON.parse(bruto) as Partial<Produto>[];
    // produtos salvos antes das categorias existirem recebem "Utilidades"
    return lista.map((p) => ({ ...p, categoria: p.categoria ?? 'Utilidades' })) as Produto[];
  } catch {
    return [];
  }
}

export async function salvarProdutos(produtos: Produto[]): Promise<void> {
  try {
    await AsyncStorage.setItem(CHAVE, JSON.stringify(produtos));
  } catch (erro) {
    console.error('Erro ao salvar produtos', erro);
  }
}