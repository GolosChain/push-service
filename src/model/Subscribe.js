const core = require('griboyedov');
const MongoDB = core.service.MongoDB;

module.exports = MongoDB.makeModel('Subscribe', {
    user: {
        type: String,
        required: true,
        index: true,
    },
    key: {
        type: String,
        required: true,
    },
    deviceType: {
        type: String,
        required: true
    }
});
