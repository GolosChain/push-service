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
        const response = await this.sendTo('notify', 'history', params);

        if (response.error) {
            throw response.error;
        } else {
            return response.result;
        }
    }

    async getHistoryFresh({ user, profile }) {
        const types = await this._getUserRequiredTypes(user, profile);
        const params = { user, types };
        const response = await this.sendTo('notify', 'historyFresh', params);

        if (response.error) {
            throw response.error;
        } else {
            return response.result;
        }
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
        const options = await Model.findOne({ user, profile }, { show: true }, { lean: true });

        if (!options || !options.show) {
            throw { code: 404, message: 'Not found' };
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
