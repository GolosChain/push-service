const { google } = require('googleapis');
const request = require('request-promise-native');
const core = require('gls-core-service');
const stats = core.Stats.client;
const logger = core.Logger;
const Subscribe = require('../../model/Subscribe');

const GOOGLE_AUTH_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const GOOGLE_PUSH_GATE = 'https://fcm.googleapis.com/v1/projects/golos-5b0d5/messages:send';

class Push {
    constructor() {
        this._googleKey = require('../../../key.json');
    }

    async broadcast(data) {
        const time = new Date();
        let authKey;

        try {
            authKey = await this._getAuthKey();
        } catch (error) {
            stats.increment('google_auth_error');
            logger.error(`Google auth - ${error}`);
            process.exit(1);
        }

        for (let user of Object.keys(data)) {
            await this._transferToUser(user, data, authKey);
        }

        stats.timing('send_push_list', time - new Date());
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

        if (!subscribes || !subscribes.length) {
            return;
        }

        try {
            await this._sendPushBy(subscribes, authKey, data);
        } catch (error) {
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
        return await Subscribe.find({ user }, { _id: false, key: true, show: true, lang: true });
    }

    async _sendPushBy(subscribes, authKey, data) {
        for (let subscribe of subscribes) {
            const events = this._filtrateByOptions(data, subscribe.show);

            if (!Object.keys(events).length) {
                return;
            }

            let body = this._makePushBody(subscribe, events);

            await this._doPushRequest(authKey, body);
        }
    }

    async _doPushRequest(authKey, body) {
        await request({
            method: 'POST',
            uri: GOOGLE_PUSH_GATE,
            json: true,
            body,
            headers: {
                Authorization: `Bearer ${authKey}`,
            },
        });
    }

    _filtrateByOptions(data, options) {
        let result = {};

        for (let type of Object.keys(data)) {
            if (options[type]) {
                result[type] = data[type];
            }
        }

        return result;
    }

    _makePushBody(subscribe, events) {
        const body = this._makeMessage(subscribe.lang, events);

        return {
            message: {
                token: subscribe.key,
                notification: {
                    title: 'GOLOS',
                    body,
                },
            },
        };
    }

    _makeMessage(lang, events) {
        // TODO -
        return 'test';
    }
}

module.exports = Push;
