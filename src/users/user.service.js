const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.hash)) {
        const {_id, hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            id: _id,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    console.log(userParam);
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}