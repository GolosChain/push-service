const core = require('gls-core-service');
const env = require('./data/env');
const stats = core.utils.statsClient;
const BasicMain = core.services.BasicMain;
const MongoDB = core.services.MongoDB;
const Router = require('./services/Connector');

class Main extends BasicMain {
    constructor() {
        super(stats, env);
        this.addNested(new MongoDB(), new Router());
    }
}

module.exports = Main;
