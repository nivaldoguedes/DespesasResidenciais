// Definição dos atributos da transação
export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: "despesa" | "receita";
  pessoa: number;
}

let transacoes: Transacao[] = [];

// Função que retorna o array de transações
export function getTransacoes() {
  return transacoes;
}

// Função que acrescenta uma nova transação ao array
export function addTransacao(
  descricao: string,
  valor: number,
  tipo: "despesa" | "receita",
  pessoa: number
) {
  let id = 1;
  if (transacoes.length > 0) {
    let maxId = transacoes[0].id;
    for (let i = 1; i < transacoes.length; i++) {
      if (transacoes[i].id > maxId) {
        maxId = transacoes[i].id;
      }
    }
    id = maxId + 1;
  }

  const novaTransacao: Transacao = { id, descricao, valor, tipo, pessoa };
  transacoes.push(novaTransacao);
}

// Função que deleta a transação quando o usuário é removido do sistema
export function delTransacao(pessoa: number) {
  let novasTransacoes = [];
  for (let i = 0; i < transacoes.length; i++) {
    if (transacoes[i].pessoa !== pessoa) {
      novasTransacoes.push(transacoes[i]);
    }
  }
  transacoes = novasTransacoes;
}
