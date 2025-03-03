const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const cron = require('node-cron');
const { addScheduledTask } = require('./clear-schedule'); // Import helper

module.exports = {
    data: new SlashCommandBuilder()
        .setName('schedule-command')
        .setDescription('Schedules a command to run at a specific date and time.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to schedule (e.g., ping, create-poll).')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('args')
                .setDescription('Arguments for the command, if any (comma-separated).')
                .setRequired(false)),
    async execute(interaction) {
        const commandName = interaction.options.getString('command');
        const args = interaction.options.getString('args')?.split(',').map(arg => arg.trim()) || [];

        const command = interaction.client.commands.get(commandName);
        if (!command) {
            return interaction.reply({
                content: `Command "${commandName}" not found.`,
                ephemeral: true
            });
        }

        const dayMenu = new SelectMenuBuilder()
            .setCustomId('select-day')
            .setPlaceholder('Select Day')
            .addOptions([...Array(31)].map((_, i) => ({
                label: `${i + 1}`,
                value: `${i + 1}`
            })));

        const monthMenu = new SelectMenuBuilder()
            .setCustomId('select-month')
            .setPlaceholder('Select Month')
            .addOptions([
                { label: 'January', value: '1' },
                { label: 'February', value: '2' },
                { label: 'March', value: '3' },
                { label: 'April', value: '4' },
                { label: 'May', value: '5' },
                { label: 'June', value: '6' },
                { label: 'July', value: '7' },
                { label: 'August', value: '8' },
                { label: 'September', value: '9' },
                { label: 'October', value: '10' },
                { label: 'November', value: '11' },
                { label: 'December', value: '12' },
            ]);

        const yearMenu = new SelectMenuBuilder()
            .setCustomId('select-year')
            .setPlaceholder('Select Year')
            .addOptions([...Array(5)].map((_, i) => ({
                label: `${new Date().getFullYear() + i}`,
                value: `${new Date().getFullYear() + i}`
            })));

        const timeModal = new ModalBuilder()
            .setCustomId('time-modal')
            .setTitle('Select Time')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('hour')
                        .setLabel('Hour (0-23)')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('minute')
                        .setLabel('Minute (0-59)')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                )
            );

        const dateRow = new ActionRowBuilder().addComponents(dayMenu, monthMenu, yearMenu);

        await interaction.reply({
            content: `Please select a date for the scheduled command "${commandName}".`,
            components: [dateRow],
            ephemeral: true
        });

        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        let selectedDate = { day: null, month: null, year: null };
        collector.on('collect', async i => {
            if (i.customId === 'select-day') {
                selectedDate.day = i.values[0];
                await i.update({ content: `Selected day: ${selectedDate.day}`, components: [] });
            } else if (i.customId === 'select-month') {
                selectedDate.month = i.values[0];
                await i.update({ content: `Selected month: ${selectedDate.month}`, components: [] });
            } else if (i.customId === 'select-year') {
                selectedDate.year = i.values[0];
                await i.update({ content: `Selected year: ${selectedDate.year}`, components: [] });

                await i.showModal(timeModal);
            }
        });

        interaction.client.on('interactionCreate', async modalInteraction => {
            if (!modalInteraction.isModalSubmit() || modalInteraction.customId !== 'time-modal') return;

            const hour = modalInteraction.fields.getTextInputValue('hour');
            const minute = modalInteraction.fields.getTextInputValue('minute');

            if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
                return modalInteraction.reply({
                    content: 'Invalid time provided. Please use values between 0-23 for hours and 0-59 for minutes.',
                    ephemeral: true
                });
            }

            const cronExpression = `${minute} ${hour} ${selectedDate.day} ${selectedDate.month} *`;

            const task = cron.schedule(cronExpression, async () => {
                try {
                    const mockInteraction = {
                        client: interaction.client,
                        channel: interaction.channel,
                        user: interaction.user,
                        guild: interaction.guild,
                        options: {
                            getString: name => args.find(arg => arg.name === name) || null
                        },
                        reply: async content => interaction.channel.send(content),
                    };

                    await command.execute(mockInteraction);
                } catch (error) {
                    console.error(`[Scheduled Command Error] ${error.message}`);
                }
            });

            addScheduledTask(commandName, task);

            await modalInteraction.reply({
                content: `Command "${commandName}" has been scheduled for ${selectedDate.year}-${selectedDate.month}-${selectedDate.day} at ${hour}:${minute}.`,
                ephemeral: true
            });
        });
    },
};
