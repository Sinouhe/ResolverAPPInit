const typeDepenseImport = require('../models/typeDepense');
const {success, error } = require('../biblio/function');
const userImport = require('../models/user');

module.exports = {
    getAll(req, res) {
        const userId = req.query.userId;
        if (userId) {
            userImport.findById(userId)
                .then((userResult) => {
                    if (userResult) {
                        typeDepenseImport.find({oUser: userResult})
                            .then((typesDepensesRes) => {
                                res.send(success('liste des type de dpense ',typesDepensesRes));    
                            }).catch((err) => {
                                res.send(error(err.message));
                            });
                    } else {
                        res.send(error(`utilisteur non trouvé user Id : ${userId}`));
                    }
                })
                .catch((err) => {
                    res.send(error(err.message, ''));
                 
                })
        }else{
            res.send(error(`Information(s) manquante(s) user Id : ${userId}`));
        }
    },
    addOne(req,res){
        const nom = req.body.typeDepense._sNom;
        const description = req.body.typeDepense._sDescription;
        const userId = req.body.userId;
        if (nom && userId) {
            userImport.findById(userId)
                .then((userResult) => {
                    const typeDepense = new typeDepenseImport({ 'sNom': nom, 
                                                                'sDescription': description, 
                                                                'oUser': userResult});
                    typeDepense.save()
                        .then(() => {
                            res.send(success('type de dépense créé', typeDepense));
                        })
                        .catch((err) => {
                            // si erreur field unique
                            if (err.name === 'MongoError' && err.code === 11000) {
                                res.send(error('Ce nom de dépense existe déjà', typeDepense));
                            } else {
                                res.send(error(err.message, typeDepense));
                            } 
                        })
                })
                .catch((err) => {
                    res.send(error(err.message, typeDepense));
                 
                })
        }else{
            res.send(error(`Information(s) manquante(s) nom : ${nom}`));
        }
    },
    modifyOne(req,res){
        const nom = req.body.typeDepense._sNom;
        const description = req.body.typeDepense._sDescription;
        const id = req.body.typeDepense._sId;
        console.log('nom : ' + nom + ' description : ' + description + ' id : '+ id);
        if(nom && id){
            typeDepenseImport.update({_id: id}, { $set: { sNom: nom, sDescription: description }})
                .then(() => {
                    res.send(success('typeDepense mis à jour.', typeDepense));
                })
                .catch((err) => {
                    res.send(error(err.message, typeDepense));
                })
        }else{
            res.send(error(`Information(s) manquante(s) nom : ${nom}, description: ${description}, id: ${id}.`));
        }
    },


}