const mongoose = require('mongoose');
const schema = mongoose.Schema;

const depenseFixeSchema = new schema({
    sNom: {
        type: String,
        required: [true, 'Le nom est requis'],
    },
    sDescription: {
        type: String
    },
    nMontant: {
        type: Number
    },
    oUser: {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    bActif: {
        type: Boolean,
        default: true
    }
});

depenseFixeSchema.index({sNom: 1, oUser: 1}, {unique: true});

module.exports = typeDepense = mongoose.model('depenseFixe',depenseFixeSchema,'depenseFixe_COLL');