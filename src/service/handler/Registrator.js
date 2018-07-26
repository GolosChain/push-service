const core = require('gls-core-service');
const stats = core.Stats.client;
const logger = core.Logger;
const env = require('../../Env');
const Subscribe = require('../../model/Subscribe');

class Registrator {
    async register({ user, key, deviceType }) {
        const time = new Date();

        try {
            const count = await Subscribe.find({ user }).countDocuments();

            if (count > env.GLS_MAX_SUBSCRIBES) {
                stats.increment('subscribe_max_limit');
                return;
            }

            const model = new Subscribe({ user, key, deviceType });

            await model.save();
        } catch (error) {
            stats.increment('subscribe_error');
            logger.error(`Fail to subscribe - ${error}`);

            if (error.name === 'MongoError') {
                throw { code: 400, message: error.message };
            } else {
                process.exit(1);
            }
        }

        stats.timing('register_subscribe', time - new Date());
    }
}

module.exports = Registrator;
