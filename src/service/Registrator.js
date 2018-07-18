const core = require('griboyedov');
const stats = core.Stats.client;
const logger = core.Logger;
const env = require('../Env');
const BasicService = core.service.Basic;
const Subscribe = require('../model/Subscribe');

class Registrator extends BasicService {
    constructor(router) {
        super();

        this._router = router;
    }

    async start() {
        this._router.on('subscribe', this._registerSubscribe);
    }

    async _registerSubscribe(user, key, deviceType) {
        try {
            const count = await Subscribe.find({ user }).count();

            if (count > env.MAX_SUBSCRIBE_COUNT) {
                stats.increment('subscribe_max_limit');
                return;
            }

            const model = new Subscribe({ user, key, deviceType });

            await model.save();
        } catch (error) {
            stats.increment('subscribe_error');
            logger.error(`Fail to subscribe - ${error}`);
            process.exit(1);
        }
    }
}

module.exports = Registrator;
