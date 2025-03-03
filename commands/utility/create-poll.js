const { SlashCommandBuilder, PollLayoutType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-poll')
        .setDescription('Creates a poll.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The poll question')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('choices')
                .setDescription('The poll choices, separated by commas (e.g., "Choice1, Choice2, Choice3")')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const rawChoices = interaction.options.getString('choices');

        const choices = rawChoices.split(',').map(choice => choice.trim());

        if (choices.length < 2 || choices.length > 10) {
            return interaction.reply({
                content: `Please provide between 2 and 10 choices. You provided ${choices.length} choices.`,
                ephemeral: true
            });
        }

        const pollAnswers = choices.map((choice, index) => ({
            text: choice,
            emoji: `:${['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'][index]}:`
        }));

        await interaction.channel.send({
            poll: {
                question: { text: question },
                answers: pollAnswers,
                allowMultiSelect: false,
                duration: 2,
                layoutType: PollLayoutType.Default
            }
        });

        await interaction.reply({ content: 'Poll created!', ephemeral: true });
    },
};
