const { defaultEmbed } = require('../discord-utils.js');
const { gcd2, lcm2, isPrime, drawGraph, scaleFunction } = require('../utils.js');

const { AttachmentBuilder } = require('discord.js');
const math = require('mathjs');
const { createCanvas } = require('canvas');

const commands = {
    'add': (args, msg) => {
        if (args.length === 0) {
            let embed = defaultEmbed(msg, {
                title: 'Add',
                description: 'Syntax: `add [...numbers]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);

        let s = 0;
        let str = '';

        args.forEach((n, i) => {
            s += parseFloat(n);
            str += n;
            if (i != args.length - 1) {
                str += ' + ';
            }
        });

        msg.channel.send(str + ' = **' + s + '**');
    },
    'average': (args, msg) => {
        args = args.map(parseFloat);

        if (args.length === 0) {
            let embed = defaultEmbed(msg, {
                title: 'Average',
                description: 'Syntax: `average [...numbers]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        let s = 0;
        let l = args.length;

        args.forEach((n, i) => {
            s += parseFloat(n);
        });

        msg.channel.send('**' + s / l + '**');
    },


    'freq': (args, msg) => {
        let index = args.indexOf('in');

        if (args[args.length - 1] === '-s') {
            args.pop();

            let arg = args[0];

            args = args.join(' ');

            let c = 0;

            for (; index < args.length; index++) {
                if (args.charAt(index) === arg) {
                    c++;
                }
            }

            msg.channel.send('**' + c + '**');
            return;
        }

        if (args.length === 0) {
            let embed = defaultEmbed(msg, {
                title: 'Freq',
                description: 'Syntax: `freq [num | str] in [...numbers | ...str]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }


        if (index === -1) {
            let embed = defaultEmbed(msg, {
                title: 'Freq',
                description: 'Syntax: `freq [num | str] in [...numbers | ...str]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        let arg = args[0];

        let c = 0;

        for (; index < args.length; index++) {
            if (args[index] === arg) {
                c++;
            }
        }

        msg.channel.send('**' + c + '**');
    },

    'mean': (args, msg) => {
        args = args.map(parseFloat);
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'Mean',
                description: 'Syntax: `mean [...numbers]`'
            });

            msg.channel.send({
                embeds: [embed]
            });


            return;
        }



        let s = 0;

        args.forEach((num) => {
            s += parseFloat(num);
        });

        msg.channel.send('**' + s / args.length + '**');
    },

    'mode': (args, msg) => {
        args = args.map(parseFloat);
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'Mode',
                description: 'Syntax: `mode [...numbers]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        let l = args.length;

        let m = {};

        args.forEach((arg) => {
            if (m[arg]) {
                m[arg]++;
            } else {
                m[arg] = 1;
            }
        });

        let c = 0;
        let num = 0;

        for (let [_, _c] of Object.entries(m)) {
            if (_c > c) {
                c = _c;
                num = _;
            }
        }

        msg.channel.send('**' + num + '**' + ' appears the most, ' + c + ' times');
    },

    'median': (args, msg) => {
        args = args.map(parseFloat);
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'Median',
                description: 'Syntax: `median [...numbers]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        if (args.length % 2 === 0) {
            let p = args.length / 2 - 1;
            console.log(parseFloat(args[p + 1]))
            let m = (parseFloat(args[p]) + parseFloat(args[p + 1])) / 2;

            msg.channel.send('**' + m + '**');
        } else {
            let m = args[(args.length + 1) / 2 - 1];
            msg.channel.send('**' + m + '**');
        }
    },
    'gcd': (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'Gcd',
                description: 'Syntax: `gcd [...numbers]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        try {
            msg.channel.send('**' + gcd2(...args) + '**');
        } catch (e) {
            msg.channel.send(String(e));
        }
    },

    'lcm': (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'lcm',
                description: 'Syntax: `lcm [...numbers]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        try {
            msg.channel.send('**' + lcm2(...args) + '**');
        } catch (e) {
            msg.channel.send(String(e));
        }
    },

    'isprime': (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'IsPrime',
                description: 'Syntax: `isprime [number]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        msg.channel.send('' + isPrime(parseFloat(args[0])));
    },
    'calc': (args, msg) => {
        if (args.length === 0) {
            let embed = defaultEmbed(msg, {
                title: 'Calc',
                description: 'Syntax: `calc [expression]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        try {
            let expr = math.evaluate(args.join(' '));
            msg.channel.send("`" + expr + "`");
        } catch (err) {
            console.log(err);
            console.log('from: ' + msg.author.username);
        }
    },
    'graph': async (args, msg) => {
        if (args.length === 0) {
            let embed = defaultEmbed(msg, {
                title: 'Graph',
                description: 'Syntax: `graph [function]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        const expr = args.join(' ');
        let fn;

        try {
            fn = math.evaluate(expr);
            if (typeof fn !== "function") throw new Error("err");
        } catch (err) {
            let embed = defaultEmbed(msg, {
                title: 'Graph',
                description: 'Error: Invalid function'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        const canvas = createCanvas(500, 500);
        const ctx = canvas.getContext('2d');

        try {
            drawGraph(canvas, ctx, scaleFunction(fn, 20, 50));
            const url = canvas.toDataURL();
            const image = url.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(image, 'base64');
            const attachment = new AttachmentBuilder(buffer, {
                name: 'image.png'
            });

            msg.channel.send({
                files: [attachment]
            });
        } catch (err) {
            let embed = defaultEmbed(msg, {
                title: 'Graph',
                description: 'Error: Invalid function'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }
    },
}

module.exports = commands;
