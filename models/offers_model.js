var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var OfferSchema = new Schema({
    user: String,
    type: String,
    content: String,
    projectID: String
});
mongoose.model('Offer', OfferSchema);
