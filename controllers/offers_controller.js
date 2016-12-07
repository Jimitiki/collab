var mongoose = require('mongoose'),
    Offer = mongoose.model('Offer');
var db = mongoose.connection;
var offerCollection = db.collection('offers');

exports.createOffer = function(req, res) {
  req.body.projectID;
  project.offers = {};
  for (offer in offers) {}
}

exports.getOffersByProject = function(req, res, project) {
    var offers = {};
    offerCollection.find({projectID: project._id}).toArray(function(err, result) {
        var offers = {};
        var signedIn = req.session.user ? true : false;
        if (result) {
            offers = result;
        }
        res.render('post', {project: project, offers: result, signedIn: signedIn});
    });
}
