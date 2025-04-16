const {
    defaultEmbed,
    findClosestMember
} = require('../discord-utils.js');

const {
    lcm,
    gcd,
    lcm2,
    gcd2,
    drawGraph,
    isPrime,
    scaleFunction,
    toAsciiCodes,
    toHex,
    fromAsciiCodes,
    fromHex,
    convertBase,
    getRandom,
    EnergyToRadius,
    EnergyToRadius2,
    NormalizeAngle,
    formatTime,
    degToRad,
    timeOfFlight,
    maxHeight,
    range,
    finalVelocity,
    positionAtTime,
    animateProjectile,
    drawProjectileFrame,
    parseArgs,
    orbitalPeriod,
    orbitalVelocity,
    radiusAtTrueAnomaly,
    eccentricAnomalyFromTrueAnomaly,
    meanAnomaly,
    solveKepler,
    lorentzForce,
    electricFieldFromPointCharge,
    electricPotential,
    ohmvoltage,
    ohmcurrent,
    ohmresistance,
    capacitance,
    energyStoredInCapacitor,
    magneticFieldFromCurrent,
} = require('../utils.js');

const commands = {
    'degtorad': (args, msg) => {
        if (args.length == 0) {
            let embed = defaultEmbed(msg, {
                title: 'degToRad',
                description: 'Syntax: `degtorad [angle]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        msg.channel.send('' + degToRad(parseFloat(args[0])));
    },

    'timeofflight': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'timeOfFlight',
                description: 'Syntax: `timeofflight [v0] [angle]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);

        msg.channel.send('**' + timeOfFlight(args[0], args[1]) + '**');
    },

    'maxheight': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'maxHeight',
                description: 'Syntax: `maxheight [v0] [angle]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);

        msg.channel.send('**' + maxHeight(args[0], args[1]) + '**');
    },

    'range': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'range',
                description: 'Syntax: `range [v0] [angle]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);

        msg.channel.send('**' + range(args[0], args[1]) + '**');
    },

    'finalvelocity': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'finalVelocity',
                description: 'Syntax: `finalvelocity [v0] [angle]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);

        msg.channel.send('**' + finalVelocity(args[0], args[1]) + '**');
    },

    'positionattime': (args, msg) => {
        if (args.length < 3) {
            let embed = defaultEmbed(msg, {
                title: 'positionAtTime',
                description: 'Syntax: `positionattime [v0] [angle] [time]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);

        let p = positionAtTime(args[0], args[1], args[2]);
        msg.channel.send('**' + p.x + ', ' + p.y + '**');
    },


    'orbitalperiod': (args, msg) => {
        if (args.length === 0) {
            let embed = defaultEmbed(msg, {
                title: 'orbitalPeriod',
                description: 'Syntax: `orbitalperiod [semi major axis]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        const period = orbitalPeriod(parseFloat(args[0]));
        msg.channel.send('**' + period + '**');
    },

    'orbitalvelocity': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'orbitalVelocity',
                description: 'Syntax: `orbitalvelocity [radius] [semi major axis]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);

        const velocity = orbitalVelocity(args[0], args[1]);

        msg.channel.send('**' + velocity + '**');
    },

    'radiusattrueanomaly': (args, msg) => {
        if (args.length < 3) {
            let embed = defaultEmbed(msg, {
                title: 'radiusAtTrueAnomaly',
                description: 'Syntax:`radiusattrueanomaly [semi major axis] [eccentricity] [true anomaly]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        const radius = radiusAtTrueAnomaly(args[0], args[1], args[2]);
        msg.channel.send('**' + radius + '**');
    },

    'eccentricanomalyfromtrueanomaly': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'eccentricAnomalyFromTrueAnomaly',
                description: 'Syntax:`eccentricanomalyfromtrueanomaly [true anomaly] [eccentricity]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        const anomaly = eccentricAnomalyFromTrueAnomaly(args[0], args[1]);

        msg.channel.send('**' + anomaly + '**');
    },

    'meananomaly': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'meanAnomaly',
                description: 'Syntax:`meananomaly [eccentric anomaly] [eccentricity]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        const anomaly = meanAnomaly(args[0], args[1]);

        msg.channel.send('**' + anomaly + '**');
    },

    'solvekepler': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'solveKepler',
                description: 'Syntax:`solvekepler [mean anomaly] [eccentricity] [tolerance]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        const solved = solveKepler(args[0], args[1], args[2])

        msg.channel.send('**' + solved + '**');
    },

    'electricfieldfrompointcharge': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'electricFieldFromPointCharge',
                description: 'Syntax: `electricfieldfrompointcharge [q] [r]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        const solved = electricFieldFromPointCharge(...args)
        msg.channel.send('**' + solved + '**');
    },

    'electricpotential': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'electricPotential',
                description: 'Syntax: `electricpotential [q] [r]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        const solved = electricPotential(...args)
        msg.channel.send('**' + solved + '**');
    },

    'voltage': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'voltage',
                description: 'Syntax: `voltage [I] [R]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        const solved = ohmvoltage(...args)
        msg.channel.send('**' + solved + '**');
    },

    'current': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'current',
                description: 'Syntax: `current [V] [R]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        const solved = ohmcurrent(...args)
        msg.channel.send('**' + solved + '**');
    },

    'resistance': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'resistance',
                description: 'Syntax: `resistance [V] [I]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        const solved = ohmresistance(...args)
        msg.channel.send('**' + solved + '**');
    },

    'capacitance': (args, msg) => {
        if (args.length < 3) {
            let embed = defaultEmbed(msg, {
                title: 'capacitance',
                description: 'Syntax: `capacitance [epsilon] [A] [d]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        const solved = capacitance(...args);
        msg.channel.send('**' + solved + '**');
    },

    'energystoredincapacitor': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'energyStoredInCapacitor',
                description: 'Syntax: `energystoredincapacitor [C] [V]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        const solved = energyStoredInCapacitor(...args)
        msg.channel.send('**' + solved + '**');
    },

    'magneticfieldfromcurrent': (args, msg) => {
        if (args.length < 2) {
            let embed = defaultEmbed(msg, {
                title: 'magneticFieldFromCurrent',
                description: 'Syntax: `magneticfieldfromcurrent [I] [r]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        const solved = magneticFieldFromCurrent(...args)
        msg.channel.send('**' + solved + '**');
    },

    'lorentzforce': (args, msg) => {
        if (args.length < 4) {
            let embed = defaultEmbed(msg, {
                title: 'lorentzForce',
                description: 'Syntax: `lorentzforce [q] [E] [v] [B]`'
            });

            msg.channel.send({
                embeds: [embed]
            });

            return;
        }

        args = args.map(parseFloat);
        const solved = lorentzForce(...args);
        msg.channel.send('**' + solved + '**');
    }
};

module.exports = commands;