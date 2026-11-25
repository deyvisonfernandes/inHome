export type Unidade = '-' | 'gramas' | 'kilos';

export type Categoria = 'Alimentos' | 'Limpeza' | 'Higiene' | 'Bebidas' | 'Utilidades';

// filtro da lista: uma categoria, "prestes a vencer" ou null (todas)
export type Filtro = Categoria | 'vencimento' | null;

export type Produto = {
  id: string;
  nome: string;
  quantidade: string;
  unidade: Unidade;
  categoria: Categoria;
  validade?: string; // "AAAA-MM-DD" — opcional
  dataAdicao: string; // ISO — atualizada a cada salvar
};