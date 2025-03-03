const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coding-help')
        .setDescription('No cap, coding help'), // Making the question input required
    async execute(interaction) {
        const userMention = interaction.user.toString();
        await interaction.reply({ content: `# Git Gud. ${userMention}`, ephemeral: false });
    },
};
