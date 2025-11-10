const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professoresController');

// Listar todos os professores
router.get('/', professorController.listarProfessores);

// Buscar um professor por ID
router.get('/:id', professorController.buscarProfessorPorId);

// Listar todas as turmas de um professor
router.get('/:id/turmas', professorController.listarTurmasProfessor);

// Atualizar dados de um professor
router.put('/:id', professorController.atualizarProfessor);

// Adicionar uma nova turma para um professor
router.post('/:id/turmas', professorController.adicionarTurma);

// Listar professores por departamento
router.get('/departamento/:departamento', professorController.listarPorDepartamento);

// Remover um professor
router.delete('/:id', professorController.removerProfessor);

module.exports = router;
