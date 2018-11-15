const core = require('gls-core-service');
const stats = core.utils.statsClient;
const logger = core.utils.Logger;
const Subscribe = require('../models/Subscribe');

class Options {
    async get({ user, profile }) {
        const time = new Date();
        const model = await this._findOrCreateSubscribe(user, profile);

        stats.timing('get_options', time - new Date());
        return { lang: model.lang, show: model.show };
    }

    async set({ user, profile, data }) {
        const time = new Date();

        try {
            const model = await this._findOrCreateSubscribe(user, profile);

            model.lang = data.lang;
            model.show = Object.assign({}, model.show, data.show);

            await model.save();

            stats.timing('set_options', new Date() - time);
        } catch (error) {
            logger.error(error);
            stats.increment('options_invalid_request');
            throw { code: 400, message: 'Invalid request' };
        }
    }

    async _findOrCreateSubscribe(user, profile) {
        let model = await Subscribe.findOne({ user, profile });

        if (!model) {
            model = await new Subscribe({ user, profile });

            await model.save();
        }

        return model;
    }
}

module.exports = Options;
