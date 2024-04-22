const { SlashCommandBuilder } = require('discord.js');

const responses = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes – definitely",
    "You may rely on it",
    "As I see it",
    "Yes",
    "Most Likely",
    "Outlook good",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful",
    "Cope and seethe bro"
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('seer')
        .setDescription('Basically a magic 8-ball')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Your question to the seer')
                .setRequired(true)), // Making the question input required
    async execute(interaction) {
        const question = interaction.options.getString('question'); // Retrieving the question input
        const randIndex = Math.floor(Math.random() * responses.length);
		const userMention = interaction.user.toString();
        await interaction.reply({ content: `${userMention} asked: ***"${question}"***\n# ${responses[randIndex]}`, ephemeral: false });
    },
};
