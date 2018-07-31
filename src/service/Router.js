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
                subscribe: this._registrator.register.bind(this),
                transfer: this._push.broadcast.bind(this),
                getOptions: this._options.get.bind(this),
                setOptions: this._options.set.bind(this),
            },
        });

        this.addNested(this._gate);
    }

    async stop() {
        await this.stopNested();
    }
}

module.exports = Router;
