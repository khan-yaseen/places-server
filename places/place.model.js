const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const placeSchema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    imageFile: { type: String, required: true },
    address: { type: String, required: true },
    userId: { type: String, required: true}
});

placeSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Place', placeSchema);