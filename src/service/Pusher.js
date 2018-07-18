const core = require('griboyedov');
const stats = core.Stats.client;
const logger = core.Logger;
const BasicService = core.service.Basic;

class Pusher extends BasicService {
    constructor(router) {
        super();

        this._router = router;
    }

    async start() {
        this._router.on('transfer', this._broadcast);
    }

    async stop() {
        // TODO -
    }

    _broadcast(user, type, data) {
        // TODO -
    }
}

module.exports = Pusher;
