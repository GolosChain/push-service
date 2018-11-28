const { google } = require('googleapis');
const request = require('request-promise-native');
const core = require('gls-core-service');
const stats = core.utils.statsClient;
const logger = core.utils.Logger;
const Subscribe = require('../models/Subscribe');
const Locale = require('../data/locale');

const GOOGLE_AUTH_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const GOOGLE_PUSH_GATE = 'https://fcm.googleapis.com/v1/projects/golos-5b0d5/messages:send';

class Push {
    constructor() {
        this._googleKey = require('../../key.json');
    }

    async broadcast(data) {
        const time = Date.now();
        let authKey;

        try {
            authKey = await this._getAuthKey();
        } catch (error) {
            stats.increment('google_auth_error');
            logger.error(`Google auth - ${error}`);
            process.exit(1);
        }

        for (let user of Object.keys(data)) {
            await this._transferToUser(user, data[user], authKey);
        }

        stats.timing('send_push_list', Date.now() - time);
    }

    async _transferToUser(user, data, authKey) {
        let subscribes;

        try {
            subscribes = await this._getUserSubscribes(user);
        } catch (error) {
            stats.increment('options_get_error');
            logger.error(`Options get - ${error}`);
            process.exit(1);
        }

        if (!subscribes.length) {
            return;
        }

        try {
            await this._sendPushBy(subscribes, authKey, data);
        } catch (error) {
            this._handlePushError(error);
        }
    }

    _handlePushError(error) {
        stats.increment('google_send_push_error');
        logger.error(`Google send push - ${error}`);

        if (error.error) {
            const googleError = error.error.error;
            const googleErrorDetails = JSON.stringify(googleError.details);

            throw {
                code: googleError.code,
                message: `Google - ${googleError.message} - ${googleErrorDetails}`,
            };
        } else {
            process.exit(1);
        }
    }

    _getAuthKey() {
        return new Promise((resolve, reject) => {
            const key = this._googleKey;
            const jwtClient = new google.auth.JWT(
                key.client_email,
                null,
                key.private_key,
                GOOGLE_AUTH_SCOPE,
                null
            );

            jwtClient.authorize((error, tokens) => {
                if (error) {
                    reject(error);
                }

                resolve(tokens.access_token);
            });
        });
    }

    async _getUserSubscribes(user) {
        return await Subscribe.find(
            { user, key: { $exists: true, $nin: [null, ''] } },
            { _id: false, profile: true, key: true, show: true, lang: true }
        );
    }

    async _sendPushBy(subscribes, authKey, data) {
        for (let subscribe of subscribes) {
            const events = this._filtrateByOptions(data, subscribe.show);

            if (!events.length) {
                continue;
            }

            for (let event of events) {
                let body = this._makePushBody(subscribe, event);

                await this._doPushRequest(authKey, body, subscribe);
            }
        }
    }

    async _doPushRequest(authKey, body, { user, profile }) {
        try {
            await request({
                method: 'POST',
                uri: GOOGLE_PUSH_GATE,
                json: true,
                body,
                headers: {
                    Authorization: `Bearer ${authKey}`,
                },
            });
        } catch (error) {
            let keyIsAlive = true;

            try {
                if (error.error.error.code === 404) {
                    keyIsAlive = false;
                }
            } catch (ignore) {
                // do nothing
            }

            if (keyIsAlive) {
                throw error;
            } else {
                await Subscribe.update({ user, profile }, { $set: { key: null } });
            }
        }
    }

    _filtrateByOptions(data, options) {
        return data.filter(event => options[event.eventType]);
    }

    _makePushBody(subscribe, event) {
        const body = this._makeMessage(subscribe.lang, event);

        return {
            message: {
                token: subscribe.key,
                notification: {
                    title: 'GOLOS',
                    body,
                },
                data: {
                    body: JSON.stringify(event),
                },
            },
        };
    }

    _makeMessage(lang, event) {
        const locale = Locale.event[event.eventType];
        const data = Object.assign({}, event);

        data.fromUsers = data.fromUsers || [];

        if (data.fromUsers.length > 1) {
            return locale.many[lang](data);
        } else {
            return locale.one[lang](data);
        }
    }
}

module.exports = Push;
