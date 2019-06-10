const db = require('../helpers/db');
const Exercise = db.Exercise;
module.exports = {
    getById,
    create,
    update,
    delete: _delete
};

async function getById(id) {
    return await Exercise.findById(id);
}

async function create(exerciseParam) {
    const exercise = new Exercise(exerciseParam);
    return await exercise.save();
}

async function update(id, exerciseParam) {
    const exercise = Exercise.findById(id);

    if (!exercise) throw 'Exercise is not found';

    return await exercise.updateOne(exerciseParam);
}

async function _delete(id) {
    return await Exercise.findByIdAndRemove(id);
}