const core = require('gls-core-service');
const logger = core.utils.Logger;
const Model = require('../models/Subscribe');

class Subscribe {
    async getOptions({ user, profile, app }) {
        const model = await this._findOrCreateSubscribe(user, profile, app);

        return { lang: model.lang, show: model.show };
    }

    async setOptions({ user, profile, app, data }) {
        try {
            const model = await this._findOrCreateSubscribe(user, profile, app);

            model.lang = data.lang;
            model.show = Object.assign({}, model.show, data.show);

            await model.save();
        } catch (error) {
            logger.error(error);
            throw { code: 400, message: 'Invalid request' };
        }
    }

    async notifyOn({ user, profile, key, app }) {
        const model = await this._findOrCreateSubscribe(user, profile, app);

        model.key = key;
        await model.save();
    }

    async notifyOff({ user, profile, app }) {
        const model = await this._findOrCreateSubscribe(user, profile, app);

        model.key = '';
        await model.save();
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
