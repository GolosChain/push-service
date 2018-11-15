const core = require('gls-core-service');
const BasicConnector = core.services.Connector;
const Push = require('../controllers/Push');
const Options = require('../controllers/Options');

class Connector extends BasicConnector {
    constructor() {
        super();

        this._push = new Push();
        this._options = new Options();
    }

    async start() {
        await super.start({
            serverRoutes: {
                transfer: this._push.broadcast.bind(this._push),
                getOptions: this._options.get.bind(this._options),
                setOptions: this._options.set.bind(this._options),
                notifyOn: '', // TODO -
                notifyOff: '', // TODO -
            },
        });
    }
}

module.exports = Connector;
