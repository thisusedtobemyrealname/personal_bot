const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reap')
        .setDescription(`Marks a user for reaping by Unc Sev's shadow`) // Making the question input required
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to reap')
                .setRequired(true)), // Ensures a user is mentioned
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target');
        const reaper = interaction.user.toString();

        await interaction.reply({
            content: `💀 The shadow of Sevagoth has marked ${targetUser}... Your soul is claimed, ${reaper}! 💀`,
            ephemeral: false
        });
    },

};
