const {
    EmbedBuilder
} = require('discord.js');
const Fuse = require('fuse.js');

function defaultEmbed(msg, options = {}) {
    let embed = new EmbedBuilder()
        .setColor(0x01060e)
        .setAuthor({
            name: msg.author.username,
            iconURL: typeof msg.author.avatar === "string" ?
                `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
        })
        .setTitle(options.title)
        .setThumbnail('https://i.imgur.com/example.png')
        .setDescription(options.description)
        .setTimestamp()
        .setFooter({
            text: process.version,
            iconURL: 'https://i.imgur.com/example.png'
        });

    return embed;
}

async function findClosestMember(msg, input) {
    await msg.guild.members.fetch();
    const members = msg.guild.members.cache;

    const list = members.map((member) => {
        return {
            id: member.user.id,
            nick: member.nickname,
            username: member.user.username
        }
    });

    const fuse = new Fuse(list, {
        keys: ['nick', 'id', 'username'],
        threshold: 0.3
    });

    const result = await fuse.search(input);

    if (result.length > 0) {
        const userId = result[0].item.id;
        return members.get(userId);
    } else {
        return null;
    }
}

module.exports = {
    defaultEmbed: defaultEmbed,
    findClosestMember: findClosestMember
};
