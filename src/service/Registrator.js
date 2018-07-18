const core = require('griboyedov');
const stats = core.Stats.client;
const logger = core.Logger;
const BasicService = core.service.Basic;

class Registrator extends BasicService {
    constructor(router) {
        super();

        this._router = router;
    }

    async start() {
        this._router.on('subscribe', this._registerSubscribe);
    }

    async stop() {
        // TODO -
    }

    _registerSubscribe(user, key) {
        // TODO -
        // TODO filtrate max subscribe count (ENV)
    }
}

module.exports = Registrator;
