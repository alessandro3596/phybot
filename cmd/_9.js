const { defaultEmbed } = require('../discord-utils.js');
const QRCode = require('qrcode');
const { AttachmentBuilder } = require('discord.js');

const commands = {
    'qr': async (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'Qr',
                description: 'Syntax: `qr [text]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        QRCode.toDataURL(args.join(' '), async function(err, url) {
            const image = url.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(image, 'base64');

            const attachment = new AttachmentBuilder(buffer, {
                name: 'image.png'
            });

            await msg.channel.send({
                files: [attachment]
            });
        });
    }
}

module.exports = commands;
