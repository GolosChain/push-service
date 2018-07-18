const core = require('griboyedov');
const BasicService = core.service.Basic;
const Gate = core.service.Gate;

class Router extends BasicService {
    constructor() {
        super();

        this._gate = new Gate();
    }

    async start() {
        await this._gate.start({
            serverRoutes: {
                subscribe: this._subscribe.bind(this),
                transfer: this._transfer.bind(this),
            },
        });

        this.addNested(this._gate);
    }

    async stop() {
        await this.stopNested();
    }

    _subscribe({ user, params: { key } }) {
        this.emit('subscribe', user, key);
    }

    _transfer(user, type, data) {
        this.emit('transfer', user, type, data);
    }
}

module.exports = Router;
