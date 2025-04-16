const { defaultEmbed } = require('../discord-utils.js');

const commands = {
    'eval': (args, msg) => {
        if (true) {
            let embed = defaultEmbed(msg, {
                title: 'Eval',
                description: 'Permission Denied'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        let expr;
        try {
            args.pop();
            expr = String(eval(args.join(' ')));
        } catch (err) {
            expr = String(err);
        }

        if (true) {
            let embed = defaultEmbed(msg, {
                title: 'Eval',
                description: expr
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }
    }
};

module.exports = commands;