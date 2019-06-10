const express = require('express');
const router = express.Router();
const wordService = require('./word.service');

// routes
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    wordService.create(req.body)
        .then((response) => res.send(response))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    wordService.getAll()
        .then(wordList => res.json(wordList))
        .catch(err => next(err));
}

function getById(req, res, next) {
    wordService.getById(req.params.id)
        .then(word => word ? res.json(word) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    wordService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    wordService.delete(req.params.id)
        .then(() => res.send('Word is deleted'))
        .catch(err => next(err));
}