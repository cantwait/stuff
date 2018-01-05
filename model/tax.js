var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var taxSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    total: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    tAmount: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    container: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Container'
    }
});

var Tax = mongoose.model('Tax', taxSchema);

module.exports = Tax;