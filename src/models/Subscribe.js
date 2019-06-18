const core = require('gls-core-service');
const MongoDB = core.services.MongoDB;

module.exports = MongoDB.makeModel(
    'Subscribe',
    {
        user: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
            required: true,
        },
        key: {
            type: String,
        },
        lang: {
            type: String,
            enum: ['ru', 'en', 'ua'],
            default: 'ru',
        },
        app: {
            type: String,
            enum: ['gls', 'cyber'],
            default: 'cyber',
        },
        show: {
            upvote: {
                type: Boolean,
                default: true,
            },
            downvote: {
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
            reward: {
                type: Boolean,
                default: true,
            },
            curatorReward: {
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
            // Api search
            {
                fields: {
                    user: 1,
                    profile: 1,
                    app: 1,
                },
            },
            // Broadcast search
            {
                fields: {
                    user: 1,
                    app: 1,
                },
            },
        ],
    }
);
