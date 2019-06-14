const core = require('gls-core-service');
const stats = core.utils.statsClient;
const logger = core.utils.Logger;
const Model = require('../models/Subscribe');

class Subscribe {
    async getOptions({ user, profile, app }) {
        const time = Date.now();
        const model = await this._findOrCreateSubscribe(user, profile, app);

        stats.timing('subscribe_manipulation', Date.now() - time);
        return { lang: model.lang, show: model.show };
    }

    async setOptions({ user, profile, app, data }) {
        const time = Date.now();

        try {
            const model = await this._findOrCreateSubscribe(user, profile, app);

            model.lang = data.lang;
            model.show = Object.assign({}, model.show, data.show);

            await model.save();

            stats.timing('subscribe_manipulation', Date.now() - time);
        } catch (error) {
            logger.error(error);
            stats.increment('options_invalid_request');
            throw { code: 400, message: 'Invalid request' };
        }
    }

    async notifyOn({ user, profile, key, app }) {
        const time = Date.now();
        const model = await this._findOrCreateSubscribe(user, profile, app);

        model.key = key;
        await model.save();

        stats.timing('subscribe_manipulation', Date.now() - time);
    }

    async notifyOff({ user, profile, app }) {
        const time = Date.now();
        const model = await this._findOrCreateSubscribe(user, profile, app);

        model.key = '';
        await model.save();

        stats.timing('subscribe_manipulation', Date.now() - time);
    }

    async _findOrCreateSubscribe(user, profile, app) {
        let model = await Model.findOne({ user, profile, app });

        if (!model) {
            model = await new Model({ user, profile, app });

            await model.save();
        }

        return model;
    }
}

module.exports = Subscribe;
