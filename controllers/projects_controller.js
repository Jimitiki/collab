var mongoose = require('mongoose'),
    Project = mongoose.model('Project');
var db = mongoose.connection;
var projectCollection = db.collection('projects');

var offers = require("./offers_controller");

function generateID() {
  var chars = "0123456789";
  var id = "";
  do {
    for (var i = 0; i < 4; i++) {
      id += chars[Math.floor(Math.random() * 10)];
    }
  } while (projects[id]);
  return id;
}

exports.getSummaries = function(req, res) {
    var postList = {};
    var stream = Project.find()
            .batchSize(20)
            .stream();
    stream.on('data', function(project) {
                postList[project._id] = {
                    title: project.title,
                    author: project.author,
                    imageURL: project.imageUrl
                };
            }).on('error', function(error) {
                console.log(error)
            }).on('close', function() {
                res.send(postList);
    });
}

exports.getProjectByID = function(req, res) {
    var signedIn = false;
    var projectID = req.params.postID;
    Project.findOne({_id: projectID}, function (err, project) {
        if (project) {
            offers.getOffersByProject(req, res, project);
        }
    });
}

exports.addProject = function(req, res) {
    if (req.session.user) {
      var project = {
        author: req.session.username,
        title: req.body.title,
        content: req.body.description,
        imageUrl: req.body.imageURL,
        offers: []
      };
    //  var id = generateID();
        var proj = new Project(project);
        proj.save(function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.send({projectID: result._id});
            }
        });
    }
};
