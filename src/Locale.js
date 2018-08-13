const template = require('lodash.template');

// prettier-ignore
module.exports = {
    event: {
        like: {
            one: {
                ru: '${user} оценил вашу запись. 👍',
                en: '${user} liked your entry. 👍',
            },
            many: {
                ru: '${user} и еще ${count} оценили вашу запись. 👍',
                en: '${user} and ${count} others liked your entry. 👍',
            },
        },
        flag: {
            one: {
                ru: '${user} негативно оценил ваш запись. 😵',
                en: '${user} disliked your entry. 😵',
            },
            many: {
                ru: '${user} и еще ${count} негативно оценили вашу запись. 😵',
                en: '${user} and ${count} others disliked your entry. 😵',
            },
        },
        transfer: {
            one: {
                ru: '${user} перевел на ваш счет ${amount}. 💸',
                en: '${user} has transferred to your account ${amount}. 💸',
            },
            many: {
                ru: '${user} и еще ${count} перевели на ваш счет ${amount}. 💸',
                en: '${user} and ${count} others were transferred to your ${amount} account. 💸',
            },
        },
        reply: {
            one: {
                ru: '${user} ответил на вашу запись. ✌️',
                en: '${user} и еще ${count} ответили вашу запись. ✌️',
            },
            many: {
                ru: '${user} replied your entry. ✌️',
                en: '${user} and ${count} others replied your entry. ✌️',
            },
        },
        subscribe: {
            one: {
                ru: '${user} подписался на ваш блог. 😊',
                en: '${user} has subscribed to your blog. 😊',
            },
            many: {
                ru: '${user} и еще ${count} подписались на ваш блог. 😊',
                en: '${user} and ${count} others have subscribed to your blog. 😊',
            },
        },
        unsubscribe: {
            one: {
                ru: '${user} отписался от вашего блога. 😔',
                en: '${user} unsubscribed from your blog. 😔',
            },
            many: {
                ru: '${user} и еще ${count} отписались от вашего блога. 😔',
                en: '${user} and ${count} others unsubscribed from your blog. 😔',
            },
        },
        mention: {
            one: {
                ru: '${user} упомянув вас в своей записи. 🤔',
                en: '${user} mentioned you. 🤔',
            },
            many: {
                ru: '${user} и еще ${count} упомянули вас. 🤔',
                en: '${user} and ${count} others mentioned you. 🤔',
            },
        },
        repost: {
            one: {
                ru: '${user} сделал репост вашего поста. 😎',
                en: '${user} made the repost of your post. 😎',
            },
            many: {
                ru: '${user} и еще ${count} сделали репост вашего поста. 😎',
                en: '${user} and ${count} others have reposted your post. 😎',
            },
        },
        award: {
            one: {
                ru: '',
                en: '',
            },
            many: {
                ru: '',
                en: '',
            },
        },
        curatorAward: {
            one: {
                ru: '',
                en: '',
            },
            many: {
                ru: '',
                en: '',
            },
        },
        message: {
            one: {
                ru: '',
                en: '',
            },
            many: {
                ru: '',
                en: '',
            },
        },
        witnessVote: {
            one: {
                ru: '${user} проголосовал за вас как за делегата. 🔥',
                en: '${user} voted for you as a delegate. 🔥',
            },
            many: {
                ru: '${user} и еще ${count} проголосовали за вас как за делегата. 🔥',
                en: '${user} and ${count} others voted for you as delegates. 🔥',
            },
        },
        witnessCancelVote: {
            one: {
                ru: '${user} снял свой голос с вашей делегатской ноды. 🙈',
                en: '${user} has removed your voice from your delegate node. 🙈',
            },
            many: {
                ru: '${user} и еще ${count} сняли свои голоса с вашей делегатской ноды. 🙈',
                en: '${user} and ${count} others have removed their voices from your delegate node. 🙈',
            },
        },
    },
};

(function initTemplate(target) {
    for (let key of Object.keys(target)) {
        if (typeof target[key] === 'string') {
            target[key] = template(target[key]);
        } else {
            initTemplate(target[key]);
        }
    }
})(module.exports);
