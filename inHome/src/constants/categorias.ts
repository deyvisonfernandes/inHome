import { ImageSourcePropType } from 'react-native';
import { Categoria } from '../types';

export const CATEGORIAS: Categoria[] = ['Alimentos', 'Limpeza', 'Higiene', 'Bebidas', 'Utilidades'];

// As imagens ficam em: assets/categorias/  (na raiz do projeto, ao lado do App.tsx)
// Para trocar o símbolo, substitua o arquivo mantendo o mesmo nome.
export const INFO_CATEGORIA: Record<Categoria, { cor: string; imagem: ImageSourcePropType }> = {
  Alimentos: { cor: '#E8833A', imagem: require('../../assets/categorias/alimentos.png') }, // laranja
  Limpeza: { cor: '#3FA66B', imagem: require('../../assets/categorias/limpeza.png') }, // verde
  Higiene: { cor: '#3B82C4', imagem: require('../../assets/categorias/higiene.png') }, // azul
  Bebidas: { cor: '#8A949B', imagem: require('../../assets/categorias/bebidas.png') }, // cinza
  Utilidades: { cor: '#8B5E3C', imagem: require('../../assets/categorias/utilidades.png') }, // marrom
};