const { defaultEmbed, findClosestMember } = require('../discord-utils.js');
const { EmbedBuilder } = require('discord.js');

const commands = {
    'ping': (args, msg) => {
        msg.channel.send(`**${Date.now() - msg.createdTimestamp}ms**`);
    },

    'userinfo': async (args, msg) => {
        let target = args[0] || msg.author.id;
        let member = await findClosestMember(msg, target);
        target = member.user;

        const embed = new EmbedBuilder()
            .setTitle(`${target.tag}'s Info`)
            .setThumbnail(target.displayAvatarURL({
                dynamic: true
            }))
            .addFields({
                name: 'Username',
                value: target.username,
                inline: true
            }, {
                name: 'Discriminator',
                value: `#${target.discriminator}`,
                inline: true
            }, {
                name: 'ID',
                value: target.id,
                inline: false
            }, {
                name: 'Bot?',
                value: target.bot ? 'Yes' : 'No',
                inline: true
            }, {
                name: 'Account Created',
                value: `<t:${Math.floor(target.createdTimestamp / 1000)}:F>`,
                inline: false
            }, {
                name: 'Joined Server',
                value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`,
                inline: false
            })
            .setColor(0x01060e)
            .setFooter({
                text: `Requested by ${msg.author.tag}`,
                iconURL: msg.author.displayAvatarURL({
                    dynamic: true
                })
            })
            .setTimestamp();

        await msg.channel.send({
            embeds: [embed]
        });
    },

    'connect': (args, msg) => {
        if (global.connectedChannels[msg.channel.id]) {
            return;
        }

        global.connectedChannels[msg.channel.id] = msg.channel;

        msg.reply({
            content: 'Connected!',
            allowedMentions: {
                repliedUser: false
            }
        });
    },

    'disconnect': (args, msg) => {
        if (global.connectedChannels[msg.channel.id]) {
            delete global.connectedChannels[msg.channel.id];
        } else {
            return;
        }

        msg.reply({
            content: 'disconnected!',
            allowedMentions: {
                repliedUser: false
            }
        });
    },

    'avatar': async (args, msg) => {
        if (args.length === 0) {
            let user = msg.author;

            await msg.channel.send(user.displayAvatarURL({
                size: 2048,
                dynamic: true
            }));
            return;
        }

        let member = await findClosestMember(msg, args[0]);

        let user = member.user;

        await msg.channel.send(user.displayAvatarURL({
            size: 2048,
            dynamic: true
        }));
    },

    'suggest': async (args, msg) => {
        if (args.length === 0) {
            let embed = defaultEmbed(msg, {
                title: 'Suggest',
                description: 'Suggest something to the developer'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }
        const channel = await global.client.channels.fetch('channel_id');
        await channel.send('Suggestion: ' + args.join(' '));
        msg.channel.send('thank you');
    }
}

module.exports = commands;
