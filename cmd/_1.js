const punycode = require('punycode/');
const { defaultEmbed } = require('../discord-utils.js');
const {
    toAsciiCodes,
    toHex,
    fromAsciiCodes,
    fromHex,
    convertBase
} = require('../utils.js');


const commands = {
    'punycode2text': async (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'Punycode2Text',
                description: 'Syntax: `punycode2text [punycode]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }
        const input = args.join(' ');
        try {
            const decoded = punycode.toUnicode(input);
            msg.channel.send('`' + decoded + '`')
        } catch (e) {
            let embed = defaultEmbed(msg, {
                title: 'Punycode2Text',
                description: 'Error: Invalid punycode'
            });

            msg.channel.send({
                embeds: [embed]
            });
        }
    },

    'text2punycode': async (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'Text2Punycode',
                description: 'Syntax: `text2punycode [text]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        const input = args.join(' ');
        try {
            const encoded = punycode.toASCII(input);
            msg.channel.send('`' + encoded + '`')
        } catch (e) {
            let embed = defaultEmbed(msg, {
                title: 'Text2Punycode',
                description: 'Error: could not convert to punycode'
            });

            msg.channel.send({
                embeds: [embed]
            });
        }
    },

    'ascii2text': async (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'Ascii2Text',
                description: 'Syntax: `ascii2text [ascii]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        const input = args.join(' ');
        try {
            const text = fromAsciiCodes(input);
            msg.channel.send('`' + text + '`');
        } catch {
            let embed = defaultEmbed(msg, {
                title: 'Ascii2Text',
                description: 'Error: Invalid Ascii'
            });

            msg.channel.send({
                embeds: [embed]
            });
        }
    },

    'text2ascii': async (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'Text2Ascii',
                description: 'Syntax: `text2ascii [text]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        const input = args.join(' ');
        const ascii = toAsciiCodes(input);

        msg.channel.send('`' + ascii + '`')
    },

    'hex2text': async (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'Hex2Text',
                description: 'Syntax: `hex2text [hex]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        const input = args.join(' ');
        try {
            const text = fromHex(input);
            msg.channel.send('`' + text + '`')
        } catch {
            let embed = defaultEmbed(msg, {
                title: 'Hex2Text',
                description: 'Error: Invalid hex'
            });

            msg.channel.send({
                embeds: [embed]
            });
        }
    },

    'text2hex': async (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'text2hex',
                description: 'Syntax: `text2hex [text]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        const input = args.join(' ');
        const hex = toHex(input);

        msg.channel.send('`' + hex + '`');
    },
    'bin2dec': async (args, msg) => {
        try {
            const result = convertBase(args[0], 2, 10);
            msg.channel.send(`Binary \`${args[0]}\` = Decimal \`${result}\``);
        } catch (err) {
            msg.channel.send(err.message);
        }
    },

    'bin2hex': async (args, msg) => {
        try {
            const result = convertBase(args[0], 2, 16);
            msg.channel.send(`Binary \`${args[0]}\` = Hex \`${result}\``);
        } catch (err) {
            msg.channel.send(err.message);
        }
    },

    'dec2bin': async (args, msg) => {
        try {
            const result = convertBase(args[0], 10, 2);
            msg.channel.send(`Decimal \`${args[0]}\` = Binary \`${result}\``);
        } catch (err) {
            msg.channel.send(err.message);
        }
    },

    'dec2hex': async (args, msg) => {
        try {
            const result = convertBase(args[0], 10, 16);
            msg.channel.send(`Decimal \`${args[0]}\` = Hex \`${result}\``);
        } catch (err) {
            msg.channel.send(err.message);
        }
    },

    'hex2dec': async (args, msg) => {
        try {
            const result = convertBase(args[0], 16, 10);
            msg.channel.send(`Hex \`${args[0]}\` = Decimal \`${result}\``);
        } catch (err) {
            msg.channel.send(err.message);
        }
    },

    'hex2bin': async (args, msg) => {
        try {
            const result = convertBase(args[0], 16, 2);
            msg.channel.send(`Hex \`${args[0]}\` = Binary \`${result}\``);
        } catch (err) {
            msg.channel.send(err.message);
        }
    },

    'oct2dec': async (args, msg) => {
        try {
            const result = convertBase(args[0], 8, 10);
            msg.channel.send(`Octal \`${args[0]}\` = Decimal \`${result}\``);
        } catch (err) {
            msg.channel.send(err.message);
        }
    },

    'dec2oct': async (args, msg) => {
        try {
            const result = convertBase(args[0], 10, 8);
            msg.channel.send(`Decimal \`${args[0]}\` = Octal \`${result}\``);
        } catch (err) {
            msg.channel.send(err.message);
        }
    },

    'oct2bin': async (args, msg) => {
        try {
            const result = convertBase(args[0], 8, 2);
            msg.channel.send(`Octal \`${args[0]}\` = Binary \`${result}\``);
        } catch (err) {
            msg.channel.send(err.message);
        }
    },

    'bin2oct': async (args, msg) => {
        try {
            const result = convertBase(args[0], 2, 8);
            msg.channel.send(`Binary \`${args[0]}\` = Octal \`${result}\``);
        } catch (err) {
            msg.channel.send(err.message);
        }
    },
    'rgb2hex': async (args, msg) => {
        const [r, g, b] = args.map(Number);
        if ([r, g, b].some(n => isNaN(n) || n < 0 || n > 255)) {
            let embed = defaultEmbed(msg, {
                title: 'RGB2Hex',
                description: 'Error: Invalid RGB values (0 - 255)'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        msg.channel.send(`HEX: ${hex}`);
    },

    'hex2rgb': async (args, msg) => {
        let hex = args[0];
        if (!/^#?[0-9a-fA-F]{6}$/.test(hex)) {
            let embed = defaultEmbed(msg, {
                title: 'Hex2RGB',
                description: 'Syntax: `hex2rgb #000000 or 000000`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }
        hex = hex.replace(/^#/, '');
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        msg.channel.send(`RGB: (${r}, ${g}, ${b}`);
    },

    'hsl2rgb': async (args, msg) => {
        let [h, s, l] = args.map(Number);
        if (isNaN(h) || isNaN(s) || isNaN(l)) {
            let embed = defaultEmbed(msg, {
                title: 'Hsl2RGB',
                description: 'Format: like `hsl2rgb 160 100 50`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }
        h /= 360;
        s /= 100;
        l /= 100;
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        msg.channel.send(`RGB: (${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`);
    },

    'rgb2hsl': async (args, msg) => {
        let [r, g, b] = args.map(x => parseInt(x) / 255);
        if ([r, g, b].some(n => isNaN(n))) {
            let embed = defaultEmbed(msg, {
                title: 'RGB2Hsl',
                description: 'Format: like `rgb2hsl 160 160 160`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }
        const max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        msg.channel.send(`HSL: (${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
    },

    'hex2hsl': async (args, msg) => {
        const hex = args[0].replace(/^#/, '');
        if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
            let embed = defaultEmbed(msg, {
                title: 'Hex2Hsl',
                description: 'Error: Invald hex'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }
        const bigint = parseInt(hex, 16);
        const r = ((bigint >> 16) & 255) / 255;
        const g = ((bigint >> 8) & 255) / 255;
        const b = (bigint & 255) / 255;

        const max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        msg.channel.send(`HSL: (${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
    }
}

module.exports = commands;