const core = require('gls-core-service');
const BasicController = core.controllers.Basic;
const Model = require('../models/Subscribe');

class History extends BasicController {
    async getHistory({
        user,
        profile,
        afterId = null,
        types,
        limit = 10,
        markAsViewed = true,
        freshOnly = false,
    }) {
        const filteredTypes = await this._filterTypes(user, profile, types);
        const params = {
            user,
            types: filteredTypes,
            fromId: afterId,
            limit,
            markAsViewed,
            freshOnly,
        };

        return this.callService('notify', 'history', params);
    }

    async getHistoryFresh({ user, profile }) {
        const types = await this._getUserRequiredTypes(user, profile);
        const params = { user, types };

        return this.callService('notify', 'historyFresh', params);
    }

    async _filterTypes(user, profile, types) {
        const byOptions = await this._getUserRequiredTypes(user, profile);

        if (!types || types === 'all') {
            return byOptions;
        }

        const byRequest = new Set(types);
        const result = [];

        for (const i of byOptions) {
            for (const j of byRequest) {
                if (i === j) {
                    result.push(i);
                    byRequest.delete(i);
                }
            }
        }

        return result;
    }

    async _getUserRequiredTypes(user, profile) {
        const result = [];
        let options = await Model.findOne({ user, profile }, { show: true }, { lean: true });

        if (!options) {
            // throw { code: 404, message: 'Not found' };
            const newModel = new Model({user, profile})
            await newModel.save()
            options  = newModel.toObject()

        }

        for (const type of Object.keys(options.show)) {
            if (options.show[type]) {
                result.push(type);
            }
        }

        return result;
    }
}

module.exports = History;
