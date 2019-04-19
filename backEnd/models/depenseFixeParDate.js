const mongoose = require('mongoose');
const schema = mongoose.Schema;

const DepenseFixeParDateSchema = new schema({
    nMois: {
        type: Number,
        required: [true, 'Le mois est requis'],
    },
    nAnnee: {
        type: Number,
        required: [true, 'L\'année est requise'],
    },
    odepenseFixe: {
        type: schema.Types.ObjectId,
        ref: 'depenseFixe',
        required: [true, 'La dépense est requise']
    },
    bPaye: {
        type: Boolean,
        default: false
    }
});

DepenseFixeParDateSchema.index({nMois: 1, nAnnee: 1, odepenseFixe: 1}, {unique: true});

module.exports = depenseFixeParDate = mongoose.model('depenseFixeParDate',DepenseFixeParDateSchema,'depenseFixeParDate_COLL');