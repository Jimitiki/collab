var projects = {
  1234: {
    title: "test1",
    author: "todd",
    content: "lorem ipsum",
    imageURL: "http://vignette1.wikia.nocookie.net/starwars/images/5/5a/Hoth_Operations.jpg/revision/latest?cb=20150215185335",
    offers: [
      "0000"
    ]
  },
  2345: {
    title: "test2",
    author: "a",
    content: "Donde esta la biblioteca, me llamo t-bone la araña discoteca",
    imageURL: "https://i.ytimg.com/vi/VTC8HW-fFnE/maxresdefault.jpg",
    offers: [
      "0020",
      "0021",
      "0022"
    ]
  },
  3456: {
    title: "test3",
    author: "1",
    content: "discoteca, muñeca, la biblioteca",
    imageURL: "http://vignette2.wikia.nocookie.net/starwars/images/5/5c/Coruscant_at_night.jpg/revision/latest?cb=20080610031227",
    offers: [
      "0100"
    ]
  },
  4567: {
    title: "test4",
    author: "bill",
    content: "Oh whaddup",
    imageURL: "http://3g28wn33sno63ljjq514qr87.wpengine.netdna-cdn.com/wp-content/uploads/2015/11/43.jpg"
  }
}

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
                projects[result._id] = project;
                res.send({projectID: result._id});
            }
        });
    }
};
