const userImport = require('../models/user');
const {success, error } = require('../biblio/function')
const jwt = require('jsonwebtoken');
const config = require("../config");

module.exports = {
    create(req,res){
        const nom = req.body._sNom;
        const prenom = req.body._sPrenom;
        const email = req.body._sEmail;
        const password = req.body._sPassword;
        if(nom && prenom && email && password){
            const user = new userImport({'nom': nom, 'prenom': prenom, 'email': email, 'password': password});
            user.save()
                .then(() => {
                    res.send(success('Compte créé.', user));
                })
                .catch((err) => {
                    // si erreur field unique
                    if (err.name === 'MongoError' && err.code === 11000) {
                        res.send(error('Cette adresse Email est déjà utilisée', user));
                      } else {
                        res.send(error(err.message, user));
                      } 
                })
        }else{
            res.send(error(`Information(s) manquante(s) nom : ${nom}, prénom: ${prenom}, email: ${email}.`));
        }
    },
    login(req, res){
        const email = req.body.email.toLowerCase();
        const password = req.body.password
        if(password && email){
            userImport.findOne({email})
                .then((userResult) => {
                    if(userResult){
                        if (userResult.password === password) {
                            const token = jwt.sign({iss: config.rootAPI, 
                                                    email: userResult.email, 
                                                    prenom: userResult.prenom,
                                                    nom: userResult.nom,
                                                    id: userResult._id}, config.secret );
                            res.json(success(token));
                        }else{
                            res.send(error('Mauvais mot de pase.'));    
                        }
                    }else{
                        res.send(error('Aucun utilisateur avec l\'Email : ' + email));
                    }
                }).catch((err) => {
                    res.send(error(err.message));
                });
        }else{
            res.send(error(`Information(s) manquante(s) nom : email: ${email}, password: ${password}.`));
        }
    },
    getUserByEmail(req, res){
        const email = req.body.email.toLowerCase();
        // let a = 1;
        // //simulation d'un delais de réponse
        // for (i = 1  ; i < 900000000 ; i++) {
        //    a = a+1;
        // }
        if(email){
            userImport.findOne({'email': email})
                .then((userResult) => {
                    if(userResult){
                        userResult.password = '';
                        const token = jwt.sign({iss: config.rootAPI, 
                                                email: userResult.email, 
                                                prenom: userResult.prenom,
                                                nom: userResult.nom}, config.secret );
                        res.json(success(token,userResult));
                    }else{
                        res.send(error('Aucun utilisateur avec l\'Email : ' + email));
                    }
                }).catch((err) => {
                    res.send(error(err.message));
                });
        }else{
            res.send(error(`Information(s) manquante(s) nom : email: ${email}.`));
        }
    },
    changeUserByEmail(req, res){
        const nom = req.body._sNom;
        const prenom = req.body._sPrenom;
        const email = req.body._sEmail;
        if(nom && prenom && email){
            userImport.findOne({'email': email})
                .then((userResult) => {
                    if(userResult){
                        userResult.set({'nom': nom, 'prenom': prenom})
                        userResult.save()
                            .then(() => {
                                const token = jwt.sign({iss: config.rootAPI, 
                                    email: userResult.email, 
                                    prenom: userResult.prenom,
                                    nom: userResult.nom}, config.secret );
                                res.send(success('Profil modifé.', token));
                            })
                            .catch((err) => {
                                res.send(error(err.message, user));
                            })
                    }else{
                        res.send(error('Aucun utilisateur avec l\'Email : ' + email));
                    }
                }).catch((err) => {
                    res.send(error(err.message));
                });
        }else{
            res.send(error(`Information(s) manquante(s) nom : email: ${email}.`));
        }
    },

}
