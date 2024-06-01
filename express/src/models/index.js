const mongoose = require('mongoose');
const UserModel = require('./user.model');
const TokenModel = require('./token.model');

const db = {}
db.mongoose = mongoose;
db.user = UserModel
db.token = TokenModel

module.exports = db

