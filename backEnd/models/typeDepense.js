const mongoose = require('mongoose');
const schema = mongoose.Schema;

const typeDepenseSchema = new schema({
    sNom: {
        type: String,
        required: [true, 'Le nom est requis'],
    },
    sDescription: {
        type: String
    },
    oUser: {
        type: schema.Types.ObjectId,
        ref: 'user'
    }
});

typeDepenseSchema.index({sNom: 1, oUser: 1}, {unique: true});

module.exports = typeDepense = mongoose.model('typeDepense',typeDepenseSchema,'TypeDepense_COLL');