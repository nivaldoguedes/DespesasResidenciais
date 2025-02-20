import express from "express";
import { addUsuario, delUsuario, getUsuarioPeloId, getUsarios } from "./user";
import { addTransacao, delTransacao, getTransacoes } from "./transactions";
import { getTotal } from "./total";

const app = express();
const PORT = 3001;
app.use(express.json());

// Rota de requisição e listagem de membros cadastrados
app.get("/users", (req, res) => {
  res.json(getUsarios());
});

// Rota para acrescentar um novo membro na residência
app.post("/user", (req, res) => {
  const { nome, idade } = req.body;

  if (!nome || !idade) {
    res.status(400).json({ error: "Nome e idade necessários" });
  }
  res.json(addUsuario(nome, idade));
});

// Rota para deleção de algum usuário
app.delete("/user/:id", (req, res) => {
  const id = Number(req.params.id);

  // Verificação se o usuário consta no array
  const usuario = getUsuarioPeloId(id);
  if (!usuario) {
    res.status(404).json({ error: "Usuário não encontrado" });
  }

  delUsuario(id);
  delTransacao(id);
  res.json({ message: `Usuário ${usuario?.nome} removido` });
});

// Rota de requisição e listagem das transações cadastradas
app.get("/transactions", (req, res) => {
  res.json(getTransacoes());
});

// Rota para inserção de transações
app.post("/transaction", (req, res) => {
  const { descricao, valor, tipo, pessoa } = req.body;

  // Validação do tipo de transação a ser inserida
  if (tipo !== "despesa" && tipo !== "receita") {
    res.status(404).json({ error: "O tipo deve ser despesa ou receita" });
  }

  // Validação da existência do usuário ao qual será atribuída a transação
  const usuario = getUsuarioPeloId(pessoa);
  if (!usuario) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  // Validação do tipo de transação com base na idade do usuário
  if (usuario?.idade < 18 && tipo === "receita") {
    res
      .status(400)
      .json({ error: "Usuário menor de idade não pode adicionar receita" });
    return;
  }

  res.json(addTransacao(descricao, valor, tipo, pessoa));
});

// Rota de requisição de e listagem dos totais individuais e coletivos
app.get("/total", (req, res) => {
  res.json(getTotal());
});

app.listen(PORT, () => {console.log("Servidor iniciado")});
