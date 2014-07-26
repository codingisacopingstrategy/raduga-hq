var str2ID = function(id) {
    id = id.replace('ObjectID("','');
    id = id.replace('")','');
    id = new Meteor.Collection.ObjectID(id);
    return id;
};

Template.photos.photos = function () {
    var photos = Photos.find({}, { sort: {"created_at":-1} });
    if (!photos) { return []; }
    return photos;
};

Template.photos.events = {
    'click button.delete': function(e) {
        var id = str2ID(e.target.getAttribute("rel"));
        console.log("trying to remove", id);
        Photos.remove(id);
    },
    'click button.show': function(e) {
        var id = str2ID(e.target.getAttribute("rel"));
        console.log("trying to show", id);
        Photos.update(id, {"$set": {"processed": true}});
    },
    'click button.hide': function(e) {
        var id = str2ID(e.target.getAttribute("rel"));
        console.log("trying to hide", id);
        Photos.update(id, {"$set": {"processed": false}});
    }
};

