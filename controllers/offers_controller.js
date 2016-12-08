var mongoose = require('mongoose'),
    Offer = mongoose.model('Offer');
var db = mongoose.connection;
var offerCollection = db.collection('offers');

exports.addOffer = function(req, res) {
    if (req.session.user) {
        var offer = {
            user: req.session.username,
            type: req.body.type,
            content: req.body.description,
            projectID: req.session.projectID
        }
        var newOffer = new Offer(offer);
        newOffer.save(function(err, result) {
            res.send({user: offer.user, type: offer.type, content: offer.content});
        })
    }
}

exports.getOffersByProject = function(req, res, project) {
    var offers = {};
    console.log(project);
    offerCollection.find().toArray(function(err, result) {
        var offers = [];
        var signedIn = req.session.user ? true : false;
        if (result) {
            for (var i in result) {
                var o = result[i];
                if (o.projectID == project._id) {
                    offers.push(o);
                }
            }
        }
        var enabled = signedIn && project.author !== req.session.username;
        req.session.projectID = project._id;
        res.render('post', {project: project, offers: offers, signedIn: signedIn, enabled: enabled});
    });
}
