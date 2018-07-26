const core = require('gls-core-service');
const BasicService = core.service.Basic;
const Gate = core.service.Gate;
const RegistratorHandler = require('./handler/Registrator');
const PushHandler = require('./handler/Push');
const OptionsHandler = require('./handler/Options');

class Router extends BasicService {
    constructor() {
        super();

        this._gate = new Gate();
        this._registrator = new RegistratorHandler();
        this._push = new PushHandler();
        this._options = new OptionsHandler();
    }

    async start() {
        await this._gate.start({
            serverRoutes: {
                subscribe: async data => await this._registrator.register(data),
                transfer: async data => await this._push.broadcast(data),
                getOptions: async data => await this._options.get(data),
                setOptions: async data => this._options.set(data),
            },
        });

        this.addNested(this._gate);
    }

    async stop() {
        await this.stopNested();
    }
}

module.exports = Router;
