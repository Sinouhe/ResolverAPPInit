const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    nom: {
        type: String,
        required: [true, 'Le nom est requis']
    },
    prenom: {
        type: String,
        required: [true,'le prenom est requis']
    },
    email: {
        type: String,
        required: [true,'l\'email est requis'],
        unique: true,
        dropDups: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true,'le password est requis']
    }
});

module.exports = user = mongoose.model('user',userSchema,'USER_COLL');