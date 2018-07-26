const core = require('gls-core-service');
const stats = core.Stats.client;
const Subscribe = require('../../model/Subscribe');

class Options {
    async get({ key }) {
        const time = new Date();
        const result = await Subscribe.find(
            {
                key,
            },
            {
                _id: false,
                show: true,
                lang: true,
            },
            {
                lean: true,
            }
        );

        stats.timing('get_options', time - new Date());
        return result;
    }

    async set({ key, lang, show }) {
        const time = new Date();

        try {
            await Subscribe.update(
                {
                    key,
                },
                {
                    $set: {
                        show: {
                            $set: show,
                        },
                        lang,
                    },
                },
                {
                    runValidators: true,
                    upsert: true,
                }
            );
        } catch (error) {
            throw { code: 400, message: error.name };
        } finally {
            stats.timing('set_options', time - new Date());
        }
    }
}

module.exports = Options;
