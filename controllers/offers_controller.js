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

exports.getOffersByProjectID = function(req, res, projectID, project) {
  var offers = {};
  Offer.find({projectID: projectID}).toArray(function(result) {
    project.offers = result;
    res.send(project);
  }
}
