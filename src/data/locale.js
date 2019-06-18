const core = require('gls-core-service');
const Template = core.utils.Template;

// prettier-ignore
module.exports = Template.makeFor({
    event: {
        vote: {
            one: {
                ru: '${fromUsers[0]} оценил вашу запись. 👍',
                en: '${fromUsers[0]} liked your entry. 👍',
            },
            many: {
                ru: '${fromUsers[0]} и еще ${fromUsers.length} оценили вашу запись. 👍',
                en: '${fromUsers[0]} and ${fromUsers.length} others liked your entry. 👍',
            },
        },
        flag: {
            one: {
                ru: '${fromUsers[0]} негативно оценил ваш запись. 😵',
                en: '${fromUsers[0]} disliked your entry. 😵',
            },
            many: {
                ru: '${fromUsers[0]} и еще ${fromUsers.length} негативно оценили вашу запись. 😵',
                en: '${fromUsers[0]} and ${fromUsers.length} others disliked your entry. 😵',
            },
        },
        transfer: {
            one: {
                ru: '${fromUsers[0]} перевел на ваш счет ${amount}. 💸',
                en: '${fromUsers[0]} has transferred to your account ${amount}. 💸',
            },
            many: {
                ru: '${fromUsers[0]} и еще ${fromUsers.length} перевели на ваш счет ${amount}. 💸',
                en: '${fromUsers[0]} and ${fromUsers.length} others were transferred to your ${amount} account. 💸',
            },
        },
        reply: {
            one: {
                ru: '${fromUsers[0]} ответил на вашу запись. ✌️',
                en: '${fromUsers[0]} replied your entry. ✌️️',
            },
            many: {
                ru: '${fromUsers[0]} и еще ${fromUsers.length} ответили вашу запись. ✌️️',
                en: '${fromUsers[0]} and ${fromUsers.length} others replied your entry. ✌️',
            },
        },
        subscribe: {
            one: {
                ru: '${fromUsers[0]} подписался на ваш блог. 😊',
                en: '${fromUsers[0]} has subscribed to your blog. 😊',
            },
            many: {
                ru: '${fromUsers[0]} и еще ${fromUsers.length} подписались на ваш блог. 😊',
                en: '${fromUsers[0]} and ${fromUsers.length} others have subscribed to your blog. 😊',
            },
        },
        unsubscribe: {
            one: {
                ru: '${fromUsers[0]} отписался от вашего блога. 😔',
                en: '${fromUsers[0]} unsubscribed from your blog. 😔',
            },
            many: {
                ru: '${fromUsers[0]} и еще ${fromUsers.length} отписались от вашего блога. 😔',
                en: '${fromUsers[0]} and ${fromUsers.length} others unsubscribed from your blog. 😔',
            },
        },
        mention: {
            one: {
                ru: '${fromUsers[0]} упомянув вас в своей записи. 🤔',
                en: '${fromUsers[0]} mentioned you. 🤔',
            },
            many: {
                ru: '${fromUsers[0]} и еще ${fromUsers.length} упомянули вас. 🤔',
                en: '${fromUsers[0]} and ${fromUsers.length} others mentioned you. 🤔',
            },
        },
        repost: {
            one: {
                ru: '${fromUsers[0]} сделал репост вашего поста. 😎',
                en: '${fromUsers[0]} made the repost of your post. 😎',
            },
            many: {
                ru: '${fromUsers[0]} и еще ${fromUsers.length} сделали репост вашего поста. 😎',
                en: '${fromUsers[0]} and ${fromUsers.length} others have reposted your post. 😎',
            },
        },
        reward: {
            one: {
                ru: 'Ваша авторская награда ${reward.golos} GOLOS, ${reward.gbg} GBG, ${reward.golosPower} Golos Power 💸',
                en: '${reward.golos} GOLOS, ${reward.gbg} GBG, ${reward.golosPower} Golos Power your author rewards 💸',
            },
            many: {
                ru: 'Ваша авторская награда ${reward.golos} GOLOS, ${reward.gbg} GBG, ${reward.golosPower} Golos Power 💸',
                en: '${reward.golos} GOLOS, ${reward.gbg} GBG, ${reward.golosPower} Golos Power your author rewards 💸',
            },
        },
        curatorReward: {
            one: {
                ru: 'Ваша кураторская награда ${curatorReward.golos} GOLOS, ${curatorReward.gbg} GBG, ${curatorReward.golosPower} Golos Power 💸',
                en: '${curatorReward.golos} GOLOS, ${curatorReward.gbg} GBG, ${curatorReward.golosPower} Golos Power your curation rewards 💸',
            },
            many: {
                ru: 'Ваша кураторская награда ${curatorReward.golos} GOLOS, ${curatorReward.gbg} GBG, ${curatorReward.golosPower} Golos Power 💸',
                en: '${curatorReward.golos} GOLOS, ${curatorReward.gbg} GBG, ${curatorReward.golosPower} Golos Power your curation rewards 💸',
            },
        },
        witnessVote: {
            one: {
                ru: '${fromUsers[0]} проголосовал за вас как за делегата. 🔥',
                en: '${fromUsers[0]} voted for you as a delegate. 🔥',
            },
            many: {
                ru: '${fromUsers[0]} и еще ${fromUsers.length} проголосовали за вас как за делегата. 🔥',
                en: '${fromUsers[0]} and ${fromUsers.length} others voted for you as delegates. 🔥',
            },
        },
        witnessCancelVote: {
            one: {
                ru: '${fromUsers[0]} снял свой голос с вашей делегатской ноды. 🙈',
                en: '${fromUsers[0]} has removed your voice from your delegate node. 🙈',
            },
            many: {
                ru: '${fromUsers[0]} и еще ${fromUsers.length} сняли свои голоса с вашей делегатской ноды. 🙈',
                en: '${fromUsers[0]} and ${fromUsers.length} others have removed their voices from your delegate node. 🙈',
            },
        },
    },
});
