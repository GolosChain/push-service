const core = require('gls-core-service');
const Template = core.Template;

// prettier-ignore
module.exports = Template.makeFor({
    event: {
        upvote: {
            one: {
                ru: '${voter} оценил вашу запись. 👍',
                en: '${voter} liked your entry. 👍',
            },
            many: {
                ru: '${voter} и еще ${restCount} оценили вашу запись. 👍',
                en: '${voter} and ${restCount} others liked your entry. 👍',
            },
        },
        downvote: {
            one: {
                ru: '${voter} негативно оценил ваш запись. 😵',
                en: '${voter} disliked your entry. 😵',
            },
            many: {
                ru: '${voter} и еще ${restCount} негативно оценили вашу запись. 😵',
                en: '${voter} and ${restCount} others disliked your entry. 😵',
            },
        },
        transfer: {
            one: {
                ru: '${from} перевел на ваш счет ${amount}. 💸',
                en: '${from} has transferred to your account ${amount}. 💸',
            },
            many: {
                ru: '${from} и еще ${restCount} перевели на ваш счет ${amount}. 💸',
                en: '${from} and ${restCount} others were transferred to your ${amount} account. 💸',
            },
        },
        reply: {
            one: {
                ru: '${author} ответил на вашу запись. ✌️',
                en: '${author} и еще ${restCount} ответили вашу запись. ✌️',
            },
            many: {
                ru: '${author} replied your entry. ✌️',
                en: '${author} and ${restCount} others replied your entry. ✌️',
            },
        },
        subscribe: {
            one: {
                ru: '${follower} подписался на ваш блог. 😊',
                en: '${follower} has subscribed to your blog. 😊',
            },
            many: {
                ru: '${follower} и еще ${restCount} подписались на ваш блог. 😊',
                en: '${follower} and ${restCount} others have subscribed to your blog. 😊',
            },
        },
        unsubscribe: {
            one: {
                ru: '${follower} отписался от вашего блога. 😔',
                en: '${follower} unsubscribed from your blog. 😔',
            },
            many: {
                ru: '${follower} и еще ${restCount} отписались от вашего блога. 😔',
                en: '${follower} and ${restCount} others unsubscribed from your blog. 😔',
            },
        },
        mention: {
            one: {
                ru: '${author} упомянув вас в своей записи. 🤔',
                en: '${author} mentioned you. 🤔',
            },
            many: {
                ru: '${author} и еще ${restCount} упомянули вас. 🤔',
                en: '${author} and ${restCount} others mentioned you. 🤔',
            },
        },
        repost: {
            one: {
                ru: '${reposter} сделал репост вашего поста. 😎',
                en: '${reposter} made the repost of your post. 😎',
            },
            many: {
                ru: '${reposter} и еще ${restCount} сделали репост вашего поста. 😎',
                en: '${reposter} and ${restCount} others have reposted your post. 😎',
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
                ru: '${user} и еще ${restCount} проголосовали за вас как за делегата. 🔥',
                en: '${user} and ${restCount} others voted for you as delegates. 🔥',
            },
        },
        witnessCancelVote: {
            one: {
                ru: '${from} снял свой голос с вашей делегатской ноды. 🙈',
                en: '${from} has removed your voice from your delegate node. 🙈',
            },
            many: {
                ru: '${from} и еще ${restCount} сняли свои голоса с вашей делегатской ноды. 🙈',
                en: '${from} and ${restCount} others have removed their voices from your delegate node. 🙈',
            },
        },
    },
});
