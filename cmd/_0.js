const { getRandom } = require('../utils.js');
const { AttachmentBuilder } = require('discord.js');
const beautify = require('js-beautify');
const { defaultEmbed } = require('../discord-utils.js');
const { URL } = require('url');
const path = require('path');
const nodeHtmlToImage = require('node-html-to-image');
const search = require('mdn-scraper').default;

const commands = {
    'beautify': async (args, msg) => {
        if (args.length !== 0) {
            const data = args.join(' ');
            const beautifiedData = beautify(data, {
                indent_size: 4,
                space_in_empty_paren: true
            });

            const buffer = Buffer.from(beautifiedData, 'utf-8');
            const attachment = new AttachmentBuilder(buffer, {
                name: 'beautified.js'
            });

            msg.channel.send({
                files: [attachment]
            });
            return;
        }

        if (msg.attachments.first()) {
            const url = msg.attachments.first().attachment;

            const parsed = new URL(url);

            const ext = path.extname(parsed.pathname);

            const response = await fetch(url);
            const data = await response.text();
            
            let beautifiedData;

            switch(ext) {
                case '.html':
                    beautifiedData = beautify.html(data);
                    break;

                case '.css':
                    beautifiedData = beautify.css(data);
                    break;

                case '.js':
                default:
                    beautifiedData = beautify.js(data);
                    break;
            }

            const buffer = Buffer.from(beautifiedData, 'utf-8');
            const attachment = new AttachmentBuilder(buffer, {
                name: 'beautified.js'
            });

            msg.channel.send({
                files: [attachment]
            });

            return;
        }

        if (true) {
            let embed = defaultEmbed(msg, {
                title: 'Beautify',
                description: 'Syntax: `beautify <code>`\nyou could also attach a file'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }
    },

    'preview': async (args, msg) => {
        if(msg.attachments.size === 0) {
            msg.channel.send('Attach a file please.');
            return;
        }

        const url = msg.attachments.first().attachment;

        const response = await fetch(url);
        const data = await response.text();

        const imageBuffer = await nodeHtmlToImage({
            html: data,
            encoding: 'buffer'
        });

        const attachment = new AttachmentBuilder(imageBuffer, {
            name: 'image.png'
        });

        msg.channel.send({
            files: [attachment]
        });
    },

    'regex': async (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'Regex',
                description: 'Syntax: `regex [pattern] [str]`'
            });
            
            msg.channel.send({
                embeds: [embed]
            });
            
            return;
        }
        const pattern = args[0];
        const testString = args.slice(1).join(' ');
        try {
            const regex = new RegExp(pattern, 'gi');
            const matches = testString.match(regex);
            if (matches) {
                await msg.channel.send(`matches: \`${matches.join(', ')}\``);
            } else {
                await msg.channel.send('no matches');
            }
        } catch (err) {
            let embed = defaultEmbed(msg, {
                title: 'Regex',
                description: 'Error: Invalid regex'
            });
            
            msg.channel.send({
                embeds: [embed]
            });
        }
    },

    'mdn': async (args, msg) => {
        if (args.length === 0) {
            let embed = defaultEmbed(msg, {
                title: 'mdn',
                description: 'Syntax: `mdn [query]`'
            });
            
            msg.channel.send({
                embeds: [embed]
            });
            
            return;
        }

        try {
            const result = await search(args[0]);
        
            const embed = defaultEmbed(msg, {
                title: result.title,
                description: result.summary
            })
            .setURL(result.url);

            msg.channel.send({
                embeds: [embed]
            });
        } catch (err) {
            let embed = defaultEmbed(msg, {
                title: 'mdn',
                description: 'Error: ' + err.message
            });
            
            msg.channel.send({
                embeds: [embed]
            });
            
            return;
        }
    },

    'uint8': (args, msg) => {
        msg.channel.send("`"+getRandom(0, 255)+"`");
    },

    'uint16': (args, msg) => {
        msg.channel.send("`"+getRandom(0, 65535)+"`");
    },

    'uint32': (args, msg) => {
        msg.channel.send("`"+getRandom(0, 4294967295)+"`");
    },

    'int8': (args, msg) => {
        msg.channel.send("`"+getRandom(-128, 127)+"`");
    },

    'int16': (args, msg) => {
        msg.channel.send("`"+getRandom(-32768, 32767)+"`");
    },

    'int32': (args, msg) => {
        msg.channel.send("`"+getRandom(-2147483648, 2147483647)+"`");
    },

    'float32': (args, msg) => {
        msg.channel.send("`"+getRandom(-3.4e38, 3.4e38)+"`");
    },

    'float64': (args, msg) => {
        msg.channel.send("`"+getRandom(-1.7e+308, 1.7e+308)+"`");
    }
}

module.exports = commands;
