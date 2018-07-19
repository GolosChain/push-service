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

    async _subscribe({ user, params: { key, deviceType } }) {
        this.emit('subscribe', user, key, deviceType);
        return 'Ok';
    }

    async _transfer({user=null, key=null, data}) {
        this.emit('transfer', user, key, data);
        return 'Ok';
    }
}

module.exports = Router;
