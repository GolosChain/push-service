const core = require('gls-core-service');
const BasicConnector = core.services.Connector;
const Push = require('../controllers/Push');
const Subscribe = require('../controllers/Subscribe');

class Connector extends BasicConnector {
    constructor() {
        super();

        this._push = new Push();
        this._subscribe = new Subscribe();
    }

    async start() {
        await super.start({
            serverRoutes: {
                transfer: this._push.broadcast.bind(this._push),
                getOptions: this._subscribe.getOptions.bind(this._subscribe),
                setOptions: this._subscribe.setOptions.bind(this._subscribe),
                notifyOn: this._subscribe.notifyOn.bind(this._subscribe),
                notifyOff: this._subscribe.notifyOff.bind(this._subscribe),
            },
        });
    }
}

module.exports = Connector;
