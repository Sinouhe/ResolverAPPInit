const depenseFixeImport = require('../models/depenseFixe');
const {success, error } = require('../biblio/function');
const userImport = require('../models/user');

module.exports = {
    getAll(req, res) {
        // console.log(req.query.userId)
        const userId = req.query.userId;
        if (userId) {
            userImport.findById(userId)
                .then((userResult) => {
                    if (userResult) {
                        depenseFixeImport.find({oUser: userResult})
                            .then((typesDepenseFixeRes) => {
                                res.send(success('liste des type de dpense ',typesDepenseFixeRes));    
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
        // console.log(req.body)
        const nom = req.body.depenseFixe._sNom;
        const description = req.body.depenseFixe._sDescription;
        const montant = req.body.depenseFixe._nMontant;
        const userId = req.body.userId;
        // console.log('nom : ' + nom + ' description : ' + description + ' montant : ' + montant + ' userId : ' + userId);
        if (nom && userId && montant) {
            userImport.findById(userId)
                .then((userResult) => {
                    const depenseFixe = new depenseFixeImport({ 'sNom': nom, 
                                                                'sDescription': description,
                                                                'nMontant': montant, 
                                                                'oUser': userResult});
                    depenseFixe.save()
                        .then(() => {
                            res.send(success('type de dépense créé', depenseFixe));
                        })
                        .catch((err) => {
                            // si erreur field unique
                            if (err.name === 'MongoError' && err.code === 11000) {
                                res.send(error('Ce nom de dépense existe déjà', depenseFixe));
                            } else {
                                res.send(error(err.message, depenseFixe));
                            } 
                        })
                })
                .catch((err) => {
                    res.send(error(err.message, depenseFixe));
                 
                })
        }else{
            res.send(error(`Information(s) manquante(s) nom : ${nom}, montant : ${montant}`));
        }
    },
    modifyOne(req,res){
        console.log(req.body)
        const nom = req.body.depenseFixe._sNom;
        const description = req.body.depenseFixe._sDescription;
        const montant = req.body.depenseFixe._nMontant;
        const actif = req.body.depenseFixe._bActif;
        const id = req.body.depenseFixe._sId;
        console.log('nom : ' + nom + ' description : ' + description + ' id : '+ id + ' montant : ' + montant + ' Actif : ' + actif);
        if(nom && id && montant && actif !== undefined){
            depenseFixeImport.update({_id: id}, { $set: { sNom: nom, sDescription: description, nMontant: montant, bActif: actif }})
                .then(() => {
                    res.send(success('typeDepense mis à jour.', typeDepense));
                })
                .catch((err) => {
                    res.send(error(err.message, typeDepense));
                })
        }else{
            res.send(error(`Information(s) manquante(s) nom : ${nom}, 
                            description: ${description}, montant: ${montant}, 
                            Actif: ${actif}, id: ${id}.`));
        }
    }

}
