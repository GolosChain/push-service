const core = require('gls-core-service');
const Template = core.utils.Template;

// prettier-ignore
module.exports = Template.makeFor({
    event: {
        upvote: {
            one: {
                ru: '${actor.username} оценил вашу запись. 👍',
                en: '${actor.username} liked your entry. 👍',
            },
            many: {
                ru: '${actor.username} и еще ${fromUsers.length} оценили вашу запись. 👍',
                en: '${actor.username} and ${fromUsers.length} others liked your entry. 👍',
            },
        },
        downvote: {
            one: {
                ru: '${actor.username} негативно оценил ваш запись. 😵',
                en: '${actor.username} disliked your entry. 😵',
            },
            many: {
                ru: '${actor.username} и еще ${fromUsers.length} негативно оценили вашу запись. 😵',
                en: '${actor.username} and ${fromUsers.length} others disliked your entry. 😵',
            },
        },
        transfer: {
            one: {
                ru: '${actor.username} перевел на ваш счет ${value.amount}. 💸',
                en: '${actor.username} has transferred to your account ${value.amount}. 💸',
            },
            many: {
                ru: '${actor.username} и еще ${fromUsers.length} перевели на ваш счет ${value.amount}. 💸',
                en: '${actor.username} and ${fromUsers.length} others were transferred to your ${value.amount} account. 💸',
            },
        },
        reply: {
            one: {
                ru: '${actor.username} ответил на вашу запись. ✌️',
                en: '${actor.username} replied your entry. ✌️️',
            },
            many: {
                ru: '${actor.username} и еще ${fromUsers.length} ответили вашу запись. ✌️️',
                en: '${actor.username} and ${fromUsers.length} others replied your entry. ✌️',
            },
        },
        subscribe: {
            one: {
                ru: '${actor.username} подписался на ваш блог. 😊',
                en: '${actor.username} has subscribed to your blog. 😊',
            },
            many: {
                ru: '${actor.username} и еще ${fromUsers.length} подписались на ваш блог. 😊',
                en: '${actor.username} and ${fromUsers.length} others have subscribed to your blog. 😊',
            },
        },
        unsubscribe: {
            one: {
                ru: '${actor.username} отписался от вашего блога. 😔',
                en: '${actor.username} unsubscribed from your blog. 😔',
            },
            many: {
                ru: '${actor.username} и еще ${fromUsers.length} отписались от вашего блога. 😔',
                en: '${actor.username} and ${fromUsers.length} others unsubscribed from your blog. 😔',
            },
        },
        mention: {
            one: {
                ru: '${actor.username} упомянув вас в своей записи. 🤔',
                en: '${actor.username} mentioned you. 🤔',
            },
            many: {
                ru: '${actor.username} и еще ${fromUsers.length} упомянули вас. 🤔',
                en: '${actor.username} and ${fromUsers.length} others mentioned you. 🤔',
            },
        },
        repost: {
            one: {
                ru: '${actor.username} сделал репост вашего поста. 😎',
                en: '${actor.username} made the repost of your post. 😎',
            },
            many: {
                ru: '${actor.username} и еще ${fromUsers.length} сделали репост вашего поста. 😎',
                en: '${actor.username} and ${fromUsers.length} others have reposted your post. 😎',
            },
        },
        reward: {
            one: {
                ru: 'Ваша авторская награда ${value.amount} ${value.currency} 💸',
                en: '${value.amount} ${value.currency} your author rewards 💸',
            },
            many: {
                ru: 'Ваша авторская награда ${value.amount} ${value.currency} 💸',
                en: '${value.amount} ${value.currency} your author rewards 💸',
            },
        },
        curatorReward: {
            one: {
                ru: 'Ваша кураторская награда ${value.amount} ${value.currency} 💸',
                en: '${value.amount} ${value.currency} your curation rewards 💸',
            },
            many: {
                ru: 'Ваша кураторская награда ${value.amount} ${value.currency} 💸',
                en: '${value.amount} ${value.currency} your curation rewards 💸',
            },
        },
        benefeciaryReward: {
            one: {
                ru: 'Ваша бенефициарская награда ${value.amount} ${value.currency} 💸',
                en: '${value.amount} ${value.currency} your benefeciary rewards 💸',
            },
            many: {
                ru: 'Ваша бенефициарская награда ${value.amount} ${value.currency} 💸',
                en: '${value.amount} ${value.currency} your benefeciary rewards 💸',
            },
        },
        witnessVote: {
            one: {
                ru: '${actor.username} проголосовал за вас как за делегата. 🔥',
                en: '${actor.username} voted for you as a delegate. 🔥',
            },
            many: {
                ru: '${actor.username} и еще ${fromUsers.length} проголосовали за вас как за делегата. 🔥',
                en: '${actor.username} and ${fromUsers.length} others voted for you as delegates. 🔥',
            },
        },
        witnessCancelVote: {
            one: {
                ru: '${actor.username} снял свой голос с вашей делегатской ноды. 🙈',
                en: '${actor.username} has removed your voice from your delegate node. 🙈',
            },
            many: {
                ru: '${actor.username} и еще ${fromUsers.length} сняли свои голоса с вашей делегатской ноды. 🙈',
                en: '${actor.username} and ${fromUsers.length} others have removed their voices from your delegate node. 🙈',
            },
        },
    },
});
