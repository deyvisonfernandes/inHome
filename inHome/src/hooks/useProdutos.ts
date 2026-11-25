import { useCallback, useEffect, useState } from 'react';
import { Categoria, Produto, Unidade } from '../types';
import { carregarProdutos, salvarProdutos } from '../storage/produtosStorage';

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    carregarProdutos().then((lista) => {
      setProdutos(lista);
      setCarregado(true);
    });
  }, []);

  // grava no storage sempre que a lista muda (só depois do primeiro carregamento)
  useEffect(() => {
    if (carregado) salvarProdutos(produtos);
  }, [produtos, carregado]);

  const adicionar = useCallback(
    (nome: string, quantidade: string, unidade: Unidade, categoria: Categoria, validade?: string) => {
      const novo: Produto = {
        id: Date.now().toString(),
        nome: nome.trim(),
        quantidade: quantidade.trim(),
        unidade,
        categoria,
        validade,
        dataAdicao: new Date().toISOString(),
      };
      setProdutos((atual) => [novo, ...atual]);
    },
    []
  );

  const editar = useCallback(
    (id: string, nome: string, quantidade: string, categoria: Categoria, validade?: string) => {
      setProdutos((atual) =>
        atual.map((p) =>
          p.id === id
            ? {
                ...p,
                nome: nome.trim(),
                quantidade: quantidade.trim(),
                categoria,
                validade, // undefined remove a validade
                dataAdicao: new Date().toISOString(), // data muda ao salvar
              }
            : p
        )
      );
    },
    []
  );

  const excluir = useCallback((id: string) => {
    setProdutos((atual) => atual.filter((p) => p.id !== id));
  }, []);

  return { produtos, adicionar, editar, excluir };
}