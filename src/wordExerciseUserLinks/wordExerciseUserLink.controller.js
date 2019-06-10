const express = require('express');
const router = express.Router();
const wordExerciseUserLinkService = require('./wordExerciseUserLink.service');

// routes
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    wordExerciseUserLinkService.getAll()
        .then((wordExerciseUserLinkList) => res.json(wordExerciseUserLinkList))
        .catch(err => next(err));
}

function create(req, res, next) {
    wordExerciseUserLinkService.create(req.body)
        .then((wordExerciseUserLinkList) => res.send(wordExerciseUserLinkList))
        .catch(err => next(err));
}

function update(req, res, next) {
    wordExerciseUserLinkService.update(req.body)
        .then((response) => res.send(response))
        .catch(err => next(err));
}

function getById(req, res, next) {
    wordExerciseUserLinkService.getById(req.params.id)
        .then(wordExerciseUserLink => wordExerciseUserLink ? res.json(wordExerciseUserLink) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    wordExerciseUserLinkService.delete(req.params.id)
        .then(() => res.send('Deleted is deleted'))
        .catch(err => next(err));
}