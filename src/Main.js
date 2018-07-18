const core = require('griboyedov');
const env = require('./Env');
const logger = core.Logger;
const stats = core.Stats.client;
const BasicService = core.service.Basic;
const MongoDB = core.service.MongoDB;
const Router = require('./service/Router');
const Registrator = require('./service/Registrator');
const Pusher = require('./service/Pusher');

class Main extends BasicService {
    constructor() {
        super();

        const mongo = new MongoDB();
        const router = new Router();
        const pusher = new Pusher(router);
        const registrator = new Registrator(router);

        this.printEnvBasedConfig(env);
        this.addNested(mongo, router, pusher, registrator);
        this.stopOnExit();
    }

    async start() {
        await this.startNested();
        stats.increment('main_service_start');
    }

    async stop() {
        await this.stopNested();
        stats.increment('main_service_stop');
        process.exit(0);
    }
}

new Main().start().then(
    () => {
        logger.info('Main service started!');
    },
    error => {
        logger.error(`Main service failed - ${error}`);
        process.exit(1);
    }
);
