const db = require('_helpers/db');

const Place = db.Place;


module.exports = {
    create,
    getByUser
};

async function create(placeParam, fileName) {
    // validate
    if (await Place.findOne({ name: placeParam.name })) {
        throw 'Place "' + placeParam.name + '"already exists';
    }
    placeParam.imageFile = fileName;
    const place = new Place(placeParam);

    // save user
    await place.save();
}

async function getByUser(id) {
    return await Place.find({userId:id});
}
