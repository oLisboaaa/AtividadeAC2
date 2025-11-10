// Dados dos professores armazenados em memória
let professores = [
  {
    "id": "1",
    "nome": "Prof. Carlos",
    "idade": 40,
    "departamento": "Matemática",
    "turmas": [
      { "codigo": "9A", "disciplina": "MAT101", "alunos": ["João", "Maria", "Pedro"] },
      { "codigo": "10A", "disciplina": "MAT201", "alunos": ["Ana", "Luiz"] }
    ]
  },
  {
    "id": "2",
    "nome": "Prof. Ana",
    "idade": 35,
    "departamento": "História",
    "turmas": [
      { "codigo": "9A", "disciplina": "HIS101", "alunos": ["João", "Pedro"] },
      { "codigo": "10B", "disciplina": "HIS201", "alunos": ["Maria", "Carlos", "Luiza"] }
    ]
  },
  {
    "id": "3",
    "nome": "Prof. João",
    "idade": 50,
    "departamento": "Ciências",
    "turmas": [
      { "codigo": "9A", "disciplina": "CIE101", "alunos": ["João", "Maria"] },
      { "codigo": "9B", "disciplina": "CIE101", "alunos": ["Pedro", "Luiz"] }
    ]
  }
];

// Controller para listar todos os professores
const listarProfessores = (req, res) => {
  res.json(professores);
};

// Controller para buscar um professor por ID
const buscarProfessorPorId = (req, res) => {
  const professor = professores.find(p => p.id === req.params.id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Professor não encontrado" });
  }

  res.json(professor);
};

// Controller para listar todas as turmas de um professor
const listarTurmasProfessor = (req, res) => {
  const professor = professores.find(p => p.id === req.params.id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Professor não encontrado" });
  }

  res.json(professor.turmas);
};

// Controller para atualizar dados de um professor
const atualizarProfessor = (req, res) => {
  const index = professores.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  const { nome, idade, departamento } = req.body;
  professores[index] = { ...professores[index], nome, idade, departamento };

  res.json(professores[index]);
};

// Controller para adicionar uma nova turma a um professor
const adicionarTurma = (req, res) => {
  const professor = professores.find(p => p.id === req.params.id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Professor não encontrado" });
  }

  const { codigo, disciplina, alunos } = req.body;
  professor.turmas.push({ codigo, disciplina, alunos });

  res.status(201).json(professor);
};

// Controller para listar professores por departamento
const listarPorDepartamento = (req, res) => {
  const departamento = req.params.departamento;
  const professoresDepartamento = professores.filter(p => p.departamento === departamento);

  if (professoresDepartamento.length === 0) {
    return res.status(404).json({ mensagem: "Nenhum professor encontrado no departamento" });
  }

  res.json(professoresDepartamento);
};

// Controller para remover um professor
const removerProfessor = (req, res) => {
  const index = professores.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  professores.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  listarProfessores,
  buscarProfessorPorId,
  listarTurmasProfessor,
  atualizarProfessor,
  adicionarTurma,
  listarPorDepartamento,
  removerProfessor,
};
