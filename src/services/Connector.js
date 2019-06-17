const core = require('gls-core-service');
const BasicConnector = core.services.Connector;
const env = require('../data/env');
const Push = require('../controllers/Push');
const Subscribe = require('../controllers/Subscribe');
const History = require('../controllers/History');

class Connector extends BasicConnector {
    constructor() {
        super();

        this._push = new Push();
        this._subscribe = new Subscribe();
        this._history = new History({ connector: this });
    }

    async start() {
        await super.start({
            serverRoutes: {
                transfer: {
                    handler: this._push.broadcast,
                    scope: this._push,
                },
                getOptions: {
                    handler: this._subscribe.getOptions,
                    scope: this._subscribe,
                    inherits: ['identification'],
                    validation: {},
                },
                setOptions: {
                    handler: this._subscribe.setOptions,
                    scope: this._subscribe,
                    inherits: ['identification'],
                    validation: {
                        required: ['data'],
                        properties: {
                            data: {
                                type: 'object',
                                additionalProperties: false,
                                validation: {
                                    properties: {
                                        lang: {
                                            type: 'string',
                                            enum: ['en', 'ru'],
                                            default: 'en',
                                        },
                                        show: {
                                            type: 'object',
                                            additionalProperties: false,
                                            validation: {
                                                properties: {
                                                    upvote: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                    downvote: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                    transfer: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                    reply: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                    subscribe: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                    unsubscribe: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                    mention: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                    repost: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                    reward: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                    curatorReward: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                    message: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                    witnessVote: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                    witnessCancelVote: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                notifyOn: {
                    handler: this._subscribe.notifyOn,
                    scope: this._subscribe,
                    inherits: ['identification'],
                    validation: {
                        required: ['key'],
                        properties: {
                            key: {
                                type: 'string',
                            },
                        },
                    },
                },
                notifyOff: {
                    handler: this._subscribe.notifyOff,
                    scope: this._subscribe,
                    inherits: ['identification'],
                    validation: {},
                },
                history: {
                    handler: this._history.getHistory,
                    scope: this._history,
                    inherits: ['identification'],
                    validation: {
                        properties: {
                            afterId: {
                                type: ['string', 'null'],
                                default: null,
                            },
                            types: {
                                type: 'array',
                                items: {
                                    type: 'string',
                                    enum: [
                                        'all',
                                        'upvote',
                                        'downvote',
                                        'transfer',
                                        'reply',
                                        'subscribe',
                                        'unsubscribe',
                                        'mention',
                                        'repost',
                                        'reward',
                                        'curatorReward',
                                        'message',
                                        'witnessVote',
                                        'witnessCancelVote',
                                    ],
                                    default: ['all'],
                                },
                            },
                            limit: {
                                type: 'number',
                                default: 10,
                            },
                            markAsViewed: {
                                type: 'boolean',
                                default: true,
                            },
                            freshOnly: {
                                type: 'boolean',
                                default: false,
                            },
                        },
                    },
                },
                historyFresh: {
                    handler: this._history.getHistoryFresh,
                    scope: this._history,
                    inherits: ['identification'],
                    validation: {},
                },
            },
            serverDefaults: {
                parents: {
                    identification: {
                        validation: {
                            required: ['app', 'user', 'profile'],
                            properties: {
                                app: {
                                    type: 'string',
                                    enum: ['cyber', 'gls'],
                                    default: 'cyber',
                                },
                                user: {
                                    type: 'string',
                                },
                                profile: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            requiredClients: {
                notify: env.GLS_NOTIFY_CONNECT,
            },
        });
    }
}

module.exports = Connector;
