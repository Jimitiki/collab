var offers = {
  "0000": {
    user: "todd",
    type: "money",
    desc: "4000 dollars"
  },
  "0020": {
    user: "todd",
    type: "material",
    desc: "wood"
  },
  "0021": {
    user: "bill",
    type: "skill",
    desc: "science"
  },
  "0022": {
    user: "a",
    type: "space",
    desc: "Workshop"
  },
  "0100": {
    user: "a",
    type: "material",
    desc: "wire"
  },
  "0006": {
    user: "1",
    type: "money",
    desc: "10 cents"
  },
  "0888": {
    user: "1",
    type: "skill",
    desc: "Carpentry"
  },
}

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
    console.log(project);
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
