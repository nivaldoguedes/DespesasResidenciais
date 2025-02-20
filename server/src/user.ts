// Definação dos atributos de cada membro
export interface Usuario {
  id: number;
  nome: string;
  idade: number;
}

let usuarios: Usuario[] = [];

// Função que retorna o array de todos membros da residência
export function getUsarios() {
  return usuarios;
}

// Função que retorna um membro pelo identificador único
export function getUsuarioPeloId(id: number) {
  // Laço que percorre o array em busca do membro de interesse
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      return usuarios[i];
    }
  }
}

// Função que adiciona um novo membro no array
export function addUsuario(nome: string, idade: number) {
  let id = 1;
  if (usuarios.length > 0) {
    let maxId = usuarios[0].id;

    // Laço que varre o array de usuários para encontrar o último
    for (let i = 1; i < usuarios.length; i++) {
      if (usuarios[i].id > maxId) {
        maxId = usuarios[i].id;
      }
    }
    id = maxId + 1;
  }

  const novoUsuario: Usuario = { id, nome, idade };
  usuarios.push(novoUsuario);
  return novoUsuario;
}

// Função que remove um usuário do sistema com base no identificador único
export function delUsuario (id: number) {
  let novosUsuarios = [];

  // Laço que varre o array de usuários para encontrar o usuário procurado
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id !== id) {
      novosUsuarios.push(usuarios[i]);
    }
  }
  usuarios = novosUsuarios;
};