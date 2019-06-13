const express = require('express');
const router = express.Router();
const translationService = require('./translation.service');

// routes
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


function getAll(req, res, next) {
    translationService.getAll(req.user.sub)
        .then(trnsList => res.json(trnsList))
        .catch(err => next(err));
}

function create(req, res, next) {
    translationService.create(req)
        .then((response) => res.send(response))
        .catch(err => next(err));
}

function getById(req, res, next) {
    translationService.getById(req.params.id)
        .then(translation => translation ? res.json(translation) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    translationService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    translationService.delete(req.params.id)
        .then(() => res.send('Translation is deleted'))
        .catch(err => next(err));
}