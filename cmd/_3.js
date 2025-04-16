const Uwuifier = require('uwuifier').default;
const fs = require('fs');
const { defaultEmbed } = require('../discord-utils.js');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

const { createCanvas } = require('canvas');

const uwuifier = new Uwuifier();

const commands = {
    'define': async (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'Define',
                description: 'Syntax: `define [...words]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args.forEach(async (word, index) => {
            const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status !== 200) {
                let embed = new EmbedBuilder()
                    .setAuthor({
                        name: msg.author.username,
                        iconURL: typeof msg.author.avatar === "string" ?
                            `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                    })
                    .setTitle("Define")
                    .setDescription("Error: word not found")
                    .setColor(0xf38ba8)
                    .setTimestamp();
                await msg.reply({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    }
                });

                return;
            }

            const data = await response.json();

            const wordData = data[0];

            let embed = new EmbedBuilder()
                .setColor(0x1e66f5)
                .setAuthor({
                    name: msg.author.username,
                    iconURL: typeof msg.author.avatar === "string" ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                })
                .setTitle(wordData.word)
                .setURL(wordData.sourceUrls[0] || "https://example.com")
                .setDescription(`\`${wordData.phonetics[1]?.text || wordData.phonetic || wordData.phonetics[0]?.text || 'undefined'}\` [audio](${wordData.phonetics[0]?.audio})`);
            wordData.meanings.forEach((meaning) => {
                embed = embed.addFields({
                    name: meaning.partOfSpeech,
                    value: meaning.definitions[0].definition
                });
            });
            embed = embed.setTimestamp();

            await msg.channel.send({
                embeds: [embed]
            });

            if (index > 5) await new Promise(resolve, () => setTimeout(resolve, 1400));
        });
    },

    'pixelify': async (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'pixelify',
                description: 'Syntax: `pixelify [text]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        const textArr = args.filter((e) => !e.startsWith('--'));
        const flagArr = args.filter((e) => e.startsWith('--'));

        const flags = {};
        flagArr.forEach((e) => {
            e = e.replace('--', '');
            let split = e.split('=');
            let flag = split[0];
            let value = split[1];
            flags[flag] = value;
        });

        const text = textArr.join(' ') || 'text';
        let path = font.getPath(text);
        let w = path.getBoundingBox();
        const canvas = createCanvas((w.x2 - w.x1)+10, 75);
        const ctx = canvas.getContext('2d');

        if(flags.bg) {
            ctx.save();
            ctx.fillStyle = flags.bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }
        
        let fgColor = 'black';
        if(flags.fg) {
            fgColor = flags.fg;
            ctx.fillStyle = fgColor;
        }

        font.draw(ctx, text, 5, canvas.height, 72, {
            fill: fgColor
        });

        const url = canvas.toDataURL();
        const image = url.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(image, 'base64');
        const attachment = new AttachmentBuilder(buffer, {
            name: 'image.png'
        });

        msg.channel.send({
            files: [attachment]
        });
    },
    
    'owo': (args, msg) => {
        msg.channel.send(uwuifier.uwuifySentence(args.join(' ').replaceAll('@', '!')));
    },

    'owofy': (args, msg) => {
        commands.owo(args, msg);
    },

    'owoify': (args, msg) => {
        commands.owo(args, msg);
    }
}

module.exports = commands;
