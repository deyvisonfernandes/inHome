// digita só números e a máscara coloca as barras: 25122026 -> 25/12/2026
export function mascararData(texto: string): string {
  const n = texto.replace(/\D/g, '').slice(0, 8);
  if (n.length <= 2) return n;
  if (n.length <= 4) return `${n.slice(0, 2)}/${n.slice(2)}`;
  return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`;
}

// "25/12/2026" -> "2026-12-25" (ou null se não for uma data real)
export function dataBRparaISO(texto: string): string | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto);
  if (!m) return null;
  const dia = Number(m[1]);
  const mes = Number(m[2]);
  const ano = Number(m[3]);
  const data = new Date(ano, mes - 1, dia);
  if (data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia) return null;
  return `${m[3]}-${m[2]}-${m[1]}`;
}

// "2026-12-25" -> "25/12/2026"
export function isoParaDataBR(iso?: string): string {
  if (!iso) return '';
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
}

// vazio é válido (validade é opcional); preenchido precisa ser uma data real
export function validadeValida(texto: string): boolean {
  return texto === '' || dataBRparaISO(texto) !== null;
}

// dias entre hoje e a validade (negativo = já venceu)
export function diasAteVencer(iso: string): number {
  const [a, m, d] = iso.split('-').map(Number);
  const alvo = new Date(a, m - 1, d);
  const agora = new Date();
  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  return Math.round((alvo.getTime() - hoje.getTime()) / 86400000);
}