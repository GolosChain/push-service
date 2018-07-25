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

    async broadcast({ user, data }) {
        const time = new Date();
        let authKey;
        let subscribes;

        try {
            subscribes = await this._getUserSubscribes(user);
        } catch (error) {
            stats.increment('options_get_error');
            logger.error(`Options get - ${error}`);
            process.exit(1);
        }

        if (!subscribes) {
            return;
        }

        try {
            authKey = await this._getAuthKey();
        } catch (error) {
            stats.increment('google_auth_error');
            logger.error(`Google auth - ${error}`);
            process.exit(1);
        }

        try {
            await this._sendPushBy(subscribes, authKey, data);
        } catch (error) {
            stats.increment('google_send_push_error');
            logger.error(`Google send push - ${error}`);
            process.exit(1);
        }

        stats.timing('send_push', time - new Date());
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
        return await Subscribe.find({ user });
    }

    async _sendPushBy(subscribes, authKey, data) {
        for (let subscribe of subscribes) {
            const sendPack = this._filtrateByOptions(data, subscribe.options);

            if (!Object.keys(sendPack).length) {
                return;
            }

            await request({
                method: 'POST',
                uri: GOOGLE_PUSH_GATE,
                json: true,
                body: this._makePushBody(subscribe.key, sendPack),
            });
        }
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

    _makePushBody(topic, body) {
        return {
            message: {
                topic,
                notification: {
                    title: 'GOLOS',
                    body,
                },
            },
        };
    }
}

module.exports = Push;
