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
                subscribe: this._registrator.register.bind(this._registrator),
                transfer: this._push.broadcast.bind(this._push),
                getOptions: this._options.get.bind(this._options),
                setOptions: this._options.set.bind(this._options),
            },
        });

        this.addNested(this._gate);
    }

    async stop() {
        await this.stopNested();
    }
}

module.exports = Router;
