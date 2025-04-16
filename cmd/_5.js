const { NormalizeAngle, EnergyToRadius, EnergyToRadius2, formatTime, clamp2, rotateVector } = require('../utils.js');
const { defaultEmbed } = require('../discord-utils.js');

const commands = {
    'normalizeangle': (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'NormalizeAngle',
                description: 'Syntax: `normalizeangle [angle]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        msg.channel.send('**' + NormalizeAngle(parseFloat(args[0])) + '**');
    },

    'energytoradius': (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'EnergyToRadius',
                description: 'Syntax: `energytoradius [energy]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        msg.channel.send('**' + EnergyToRadius(parseFloat(args[0])) + '**');
    },

    'energytoradius2': (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'EnergyToRadius2',
                description: 'Syntax: `energytoradius2 [energy]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        msg.channel.send('**' + EnergyToRadius2(parseFloat(args[0])) + '**');
    },

    'formattime': (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'formatTime',
                description: 'Syntax: `formattime [milliseconds]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }
        msg.channel.send("`" + formatTime(parseFloat(args[0])) + "`");
    },

    'time': (args, msg) => {
        msg.channel.send(formatTime(+new Date()));
    },

    'date': (args, msg) => {
        msg.channel.send("" + new Date());
    },

    'clamp': (args, msg) => {
        if (args.length < 3) {
            let embed = defaultEmbed(msg, {
                title: 'clamp',
                description: 'Syntax: `clamp [v] [min] [max]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);

        msg.channel.send('' + clamp2(args[0], args[1], args[2]));
    },
    
    'rotatevector': (args, msg) => {
        if (args.length < 3) {
            let embed = defaultEmbed(msg, {
                title: 'rotateVector',
                description: 'Syntax: `clamp [x] [y] [angle]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);

        let v = rotateVector(args[0], args[1], args[2]);

        msg.channel.send('**' + v.x + ', ' + v.y + '**');      
    }
}

module.exports = commands;