import { getTransacoes } from "./transactions";
import { getUsarios } from "./user";

// Definição dos atributos da pessoa
interface Pessoa {
  id: number;
  nome: string;
  receita: number;
  despesa: number;
  saldo: number;
}

// Função que retorna os totais das transações individuais e coletivo
export function getTotal() {
  const users = getUsarios();
  const transactions = getTransacoes();
  let totalReceita = 0;
  let totalDespesa = 0;
  let pessoas: Pessoa[] = [];

  // Laço que varre o array de usuários somando as transações por tipo
  for (let i = 0; i < users.length; i++) {
    let receita = 0;
    let despesa = 0;

    for (let j = 0; j < transactions.length; j++) {
      if (transactions[j].pessoa === users[i].id) {
        if (transactions[j].tipo === "receita") {
          receita += transactions[j].valor;
        } else {
          despesa += transactions[j].valor;
        }
      }
    }
    totalReceita += receita;
    totalDespesa += despesa;

    // Retorna as transações totais por pessoa
    pessoas.push({
      id: users[i].id,
      nome: users[i].nome,
      receita,
      despesa,
      saldo: receita - despesa,
    });
  }

  // Retorna as transações totais da residência
  return {
    pessoas,
    totalReceita,
    totalDespesa,
    totalSaldo: totalReceita - totalDespesa,
  };
}
