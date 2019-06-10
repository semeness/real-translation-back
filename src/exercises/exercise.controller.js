const express = require('express');
const router = express.Router();
const exerciseService = require('./exercise.service');

// routes
router.post('/', create);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    exerciseService.create(req.body)
        .then((exercise) => res.json(exercise))
        .catch(err => next(err));
}

function getById(req, res, next) {
    exerciseService.getById(req.params.id)
        .then(exercise => exercise ? res.json(exercise) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    exerciseService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    exerciseService.delete(req.params.id)
        .then(() => res.send('Exercise is deleted'))
        .catch(err => next(err));
}