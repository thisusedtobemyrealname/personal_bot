const { SlashCommandBuilder } = require('discord.js');
const cron = require('node-cron');

const scheduledTasks = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear-schedule')
        .setDescription('Clears a previously scheduled command.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The name of the scheduled command to clear.')
                .setRequired(true)),
    async execute(interaction) {
        const commandName = interaction.options.getString('command');

        if (!scheduledTasks.has(commandName)) {
            return interaction.reply({
                content: `No scheduled task found for the command "${commandName}".`,
                ephemeral: true
            });
        }

        const task = scheduledTasks.get(commandName);
        task.stop();
        scheduledTasks.delete(commandName); // Remove from the map

        return interaction.reply({
            content: `The scheduled task for the command "${commandName}" has been cleared.`,
            ephemeral: true
        });
    },
};

function addScheduledTask(name, task) {
    if (scheduledTasks.has(name)) {
        scheduledTasks.get(name).stop();
    }
    scheduledTasks.set(name, task);
}

module.exports.addScheduledTask = addScheduledTask;
