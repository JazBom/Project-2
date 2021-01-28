const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('artist', artistSchema);