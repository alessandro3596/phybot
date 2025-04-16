const pool = global.pool;
const { EmbedBuilder } = require('discord.js');

const commands = {
    'tag': async (args, msg) => { // TODO: add better tag system
        if (args.length === 0) {
            let embed = new EmbedBuilder()
                .setAuthor({
                    name: msg.author.username,
                    iconURL: typeof msg.author.avatar === "string" ?
                        `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                })
                .setTitle("Tags")
                .setDescription("Syntax: `tag [create | get | update | delete] [key] [value]`")
                .setColor(0x45475a)
                .setTimestamp();
            await msg.reply({
                embeds: [embed],
                allowedMentions: {
                    repliedUser: false
                }
            });

            return;
        }

        if (args[0] === 'create') {
            if (args.length === 1) {
                const embed = new EmbedBuilder()
                    .setColor(0x45475a)
                    .setTitle("Tag Create")
                    .setAuthor({
                        name: msg.author.username,
                        iconURL: typeof msg.author.avatar === "string" ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                    })
                    .setDescription("Syntax: `tag create [key] [value]`")
                    .setTimestamp();

                await msg.reply({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    }
                });
                return;
            }

            let value;
            let key = args[1];

            if (args.length == 2 && msg.attachments.size > 0) {
                value = msg.attachments.first().attachment;
            } else if (args.length > 2) {
                args.shift();
                args.shift();
                value = args.join(' ');
                value = value.replaceAll("'", "\\'");
            } else {
                let embed = new EmbedBuilder()
                    .setAuthor({
                        name: msg.author.username,
                        iconURL: typeof msg.author.avatar === "string" ?
                            `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                    })
                    .setTitle("Tag Create")
                    .setDescription("Error: Invalid arguments")
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

            // check if the tag exists
            const selectQuery = "SELECT * FROM tags WHERE tag_key = '" + key + "'";
            const [selectRows, _] = await pool.execute(selectQuery);

            if (selectRows.length > 0) {
                let embed = new EmbedBuilder()
                    .setAuthor({
                        name: msg.author.username,
                        iconURL: typeof msg.author.avatar === "string" ?
                            `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                    })
                    .setTitle("Tag Create")
                    .setDescription("Error: Tag already Exists")
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

            const insertQuery = "INSERT INTO tags (tag_key, tag_value) VALUES ('" + key + "', '" + value + "')";
            const [insertRows, __] = await pool.execute(insertQuery);

            let embed = new EmbedBuilder()
                .setAuthor({
                    name: msg.author.username,
                    iconURL: typeof msg.author.avatar === "string" ?
                        `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                })
                .setTitle("Tag Create")
                .setDescription("Success!")
                .setColor(0x45475a)
                .setTimestamp();

            await msg.reply({
                embeds: [embed],
                allowedMentions: {
                    repliedUser: false
                }
            });
        } else if (args[0] === 'get') {
            if (args.length === 1) {
                const embed = new EmbedBuilder()
                    .setColor(0x45475a)
                    .setTitle("Tag Get")
                    .setAuthor({
                        name: msg.author.username,
                        iconURL: typeof msg.author.avatar === "string" ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                    })
                    .setDescription("Syntax: `tag get [key]`")
                    .setTimestamp();

                await msg.reply({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    }
                });
                return;
            }

            const key = args[1];

            const selectQuery = "SELECT * FROM tags WHERE tag_key = '" + key + "'";
            const [selectRows, _] = await pool.execute(selectQuery);

            if (selectRows.length > 0) {
                const value = selectRows[0].tag_value;
                await msg.channel.send(value);
            } else {
                const embed = new EmbedBuilder()
                    .setColor(0xf38ba8)
                    .setTitle("Tag Get")
                    .setAuthor({
                        name: msg.author.username,
                        iconURL: typeof msg.author.avatar === "string" ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                    })
                    .setDescription("Error: Tag not found")
                    .setTimestamp();

                await msg.reply({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    }
                });
                return;
            }
        } else if (args[0] === 'edit' || args[0] === 'update') {
            if (args.length === 1) {
                const embed = new EmbedBuilder()
                    .setColor(0x45475a)
                    .setTitle("Tag Update")
                    .setAuthor({
                        name: msg.author.username,
                        iconURL: typeof msg.author.avatar === "string" ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                    })
                    .setDescription("Syntax: `tag update [key] [value]`")
                    .setTimestamp();

                await msg.reply({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    }
                });
                return;
            }

            let key = args[1];
            let value;

            if (args.length == 3) {
                value = args[2];
            } else {
                if (args.length == 2 && msg.attachments.size > 0) {
                    value = msg.attachments.first().attachment;
                } else {
                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: msg.author.username,
                            iconURL: typeof msg.author.avatar === "string" ?
                                `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                        })
                        .setTitle("Tag Update")
                        .setDescription("Error: Invalid arguments")
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
            }

            // check if the tag exists
            const selectQuery = "SELECT * FROM tags WHERE tag_key = '" + key + "'";
            const [selectRows, _] = await pool.execute(selectQuery);

            if (selectRows.length == 0) {
                let embed = new EmbedBuilder()
                    .setAuthor({
                        name: msg.author.username,
                        iconURL: typeof msg.author.avatar === "string" ?
                            `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                    })
                    .setTitle("Tag Update")
                    .setDescription("Error: Tag does not exist")
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

            const updateQuery = "UPDATE tags SET tag_value = '" + value + "' WHERE tag_key = '" + key + "'";

            const [rows, __] = await pool.execute(updateQuery);

            let embed = new EmbedBuilder()
                .setAuthor({
                    name: msg.author.username,
                    iconURL: typeof msg.author.avatar === "string" ?
                        `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                })
                .setTitle("Tag Update")
                .setDescription("Success!")
                .setColor(0x45475a)
                .setTimestamp();

            await msg.reply({
                embeds: [embed],
                allowedMentions: {
                    repliedUser: false
                }
            });
            return;
        } else if (args[0] === 'delete') {
            if (args.length === 1) {
                const embed = new EmbedBuilder()
                    .setColor(0x45475a)
                    .setTitle("Tag Delete")
                    .setAuthor({
                        name: msg.author.username,
                        iconURL: typeof msg.author.avatar === "string" ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                    })
                    .setDescription("Syntax: `tag delete [key]`")
                    .setTimestamp();

                await msg.reply({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    }
                });
                return;
            }

            const key = args[1];

            // check if the tag exists
            const selectQuery = "SELECT * FROM tags WHERE tag_key = '" + key + "'";
            const [selectRows, _] = await pool.execute(selectQuery);

            if (selectRows.length == 0) {
                let embed = new EmbedBuilder()
                    .setAuthor({
                        name: msg.author.username,
                        iconURL: typeof msg.author.avatar === "string" ?
                            `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                    })
                    .setTitle("Tag Delete")
                    .setDescription("Error: Tag does not exist")
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

            const deleteQuery = "DELETE FROM tags WHERE tag_key = '" + key + "'";
            const [deleteRows, __] = await pool.execute(deleteQuery);

            let embed = new EmbedBuilder()
                .setAuthor({
                    name: msg.author.username,
                    iconURL: typeof msg.author.avatar === "string" ?
                        `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                })
                .setTitle("Tag Delete")
                .setDescription("Success!")
                .setColor(0x45475a)
                .setTimestamp();

            await msg.reply({
                embeds: [embed],
                allowedMentions: {
                    repliedUser: false
                }
            });
            return;
        } else if (args.length == 1) {
            const key = args[0];

            const selectQuery = "SELECT * FROM tags WHERE tag_key = '" + key + "'";
            const [selectRows, _] = await pool.execute(selectQuery);

            if (selectRows.length > 0) {
                const value = selectRows[0].tag_value;
                await msg.channel.send(value);
            } else {
                let embed = new EmbedBuilder()
                    .setAuthor({
                        name: msg.author.username,
                        iconURL: typeof msg.author.avatar === "string" ?
                            `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}${msg.author.avatar.startsWith('a_') ? '.gif' : '.png'}` : 'https://miro.medium.com/max/256/0*8WdBp_k4REJoMkfF.png'
                    })
                    .setTitle("Tag Get")
                    .setDescription("Error: Tag does not exist")
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
        }
    }
}

module.exports = commands;
