var mongoose = require('mongoose');


var containerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users:{
        type: [String]
    },
    owner: {
        type: String,
        required: true
    }
});

var Container = mongoose.model('Container', containerSchema);

module.exports = Container;