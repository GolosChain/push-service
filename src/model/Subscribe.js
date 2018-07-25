const core = require('griboyedov');
const MongoDB = core.service.MongoDB;

module.exports = MongoDB.makeModel(
    'Subscribe',
    {
        user: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
        },
        deviceType: {
            type: String,
            enum: ['ios', 'android', 'web'],
            required: true,
        },
        options: {
            vote: {
                type: Boolean,
                default: true,
            },
            flag: {
                type: Boolean,
                default: true,
            },
            transfer: {
                type: Boolean,
                default: true,
            },
            reply: {
                type: Boolean,
                default: true,
            },
            subscribe: {
                type: Boolean,
                default: true,
            },
            unsubscribe: {
                type: Boolean,
                default: true,
            },
            mention: {
                type: Boolean,
                default: true,
            },
            repost: {
                type: Boolean,
                default: true,
            },
            award: {
                type: Boolean,
                default: true,
            },
            curatorAward: {
                type: Boolean,
                default: true,
            },
            message: {
                type: Boolean,
                default: true,
            },
            witnessVote: {
                type: Boolean,
                default: true,
            },
            witnessCancelVote: {
                type: Boolean,
                default: true,
            },
        },
    },
    {
        index: [
            // Basic push broadcast
            {
                fields: {
                    user: 1,
                },
            },
            // Web-push search
            {
                fields: {
                    deviceType: 1,
                    user: 1,
                },
            },
        ],
    }
);
