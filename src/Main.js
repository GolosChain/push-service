const core = require('gls-core-service');
const env = require('./Env');
const logger = core.Logger;
const stats = core.Stats.client;
const BasicService = core.service.Basic;
const MongoDB = core.service.MongoDB;
const Router = require('./service/Router');

class Main extends BasicService {
    constructor() {
        super();

        this.printEnvBasedConfig(env);
        this.addNested(new MongoDB(), new Router());
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
