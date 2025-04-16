const { Client, ActivityType, Events, GatewayIntentBits } = require('discord.js');
const mysql = require('mysql2');

// Database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'db'
}).promise();

global.pool = pool;

// Bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

global.client = client;

// cmd
const _0 = require('./cmd/_0.js');
const _1 = require('./cmd/_1.js');
const _2 = require('./cmd/_2.js');
const _3 = require('./cmd/_3.js');
const _4 = require('./cmd/_4.js');
const _5 = require('./cmd/_5.js');
const _6 = require('./cmd/_6.js');
const _7 = require('./cmd/_7.js');
const _8 = require('./cmd/_8.js');
const _9 = require('./cmd/_9.js');


const commands = {
    ..._0, ..._1, ..._2, ..._3, ..._4, ..._5, ..._6, ..._7, ..._8, ..._9
};

console.log('Commands', Object.keys(commands).length);

client.once(Events.ClientReady, (readyClient) => { console.log(`Logged in as ${readyClient.user.tag}`); 
    client.user.setStatus('dnd');
    client.user.setActivity('n!help', { type: ActivityType.Playing });
});
client.on(Events.MessageCreate, async (msg) => {
    if (msg.author.bot) return;

    if(msg.content === 'sorry') {
        msg.channel.send(':)');
    }

    if (msg.content.startsWith("n!")) {
        const args = msg.content.slice("n!".length).trim().split(/\s+/);
        const command = args.shift().toLowerCase();
        if (commands[command]) {
            commands[command](args, msg);
        }
    }
});

client.login(process.env.TOKEN);
