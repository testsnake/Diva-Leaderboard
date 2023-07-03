const discord = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new slashCommandBuilder()
        .setName('game')
        .setDescription('Game Functions')
        .addSubcommand(subcommand =>
            subcommand
                .setName('createduel')
                .setDescription('Creates a duel')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('Game Length')
                        .setDescription('Amount of games to play in set')
                        .addChoices({name: 'Best Of 1', value: '1'},
                            {name: 'Best Of 3', value: '3'},
                            {name: 'Best Of 5', value: '5'},
                            {name: 'Best Of 7', value: '7'},
                        )
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('Game Type')
                        .setDescription('Type of game to play, default is ranked')
                        .addChoices({name: 'Freeplay', value: 'freeplay'},
                            {name: 'Ranked', value: 'ranked'}
                        )
                        .setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('reportscore')
                .setDescription('Report a score for a duel')
                .addStringOption(option =>
                    option
                        .setName('Game ID')
                        .setDescription('ID of the game to report')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('Score')
                        .setDescription('Score to report')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('acceptduel')
                .setDescription('Accept a duel request')
                .addStringOption(option =>
                    option
                        .setName('Game ID')
                        .setDescription('ID of the game to accept')
                        .setRequired(true)
                )
        )




})
