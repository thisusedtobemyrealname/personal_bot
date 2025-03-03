const { SlashCommandBuilder, PollLayoutType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('manage-poll')
        .setDescription('Manage a Poll.'),
    async execute(interaction) {
        const targetMessage = await interaction.channel.messages.fetch('');
        await targetMessage.poll.end();
    },
};