const core = require('gls-core-service');
const stats = core.Stats.client;
const Subscribe = require('../../model/Subscribe');

class Options {
    async get({ user, deviceType }) {
        const time = new Date();
        const result = await Subscribe.find(
            {
                deviceType,
                user,
            },
            {
                __v: false,
                _id: false,
                id: false,
                options: true,
            },
            {
                lean: true,
            }
        );

        stats.timing('get_options', time - new Date());
        return result;
    }

    async set({ user, deviceType, data }) {
        const time = new Date();

        await Subscribe.update(
            {
                deviceType,
                user,
            },
            {
                $set: {
                    options: {
                        $set: data,
                    },
                },
            },
            {
                runValidators: true,
            }
        );

        stats.timing('set_options', time - new Date());
    }
}

module.exports = Options;
