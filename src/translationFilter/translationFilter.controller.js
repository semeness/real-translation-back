const express = require('express');
const router = express.Router();
const translationFilterService = require('./translationFilter.service');

// routes
router.post('/', filter);

module.exports = router;

function filter(req, res, next) {
    translationFilterService.filter(req.body)
        .then((response) => res.send(response))
        .catch(err => next(err));
}