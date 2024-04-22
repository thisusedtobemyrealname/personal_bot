const { SlashCommandBuilder } = require('discord.js');

const roasts = [
    "You’re not the dumbest person in the world, but you better hope they don’t die.",
    "If I wanted to kill myself, I’d climb your ego and jump to your IQ.",
    "I’d say you’re ‘one in a million,’ but that means there are 7,800 people just like you.",
    "You’re like a software update. When I see you, I think ‘Not now.'",
    "Some people bring joy wherever they go; you bring joy whenever you go.",
    "You’re like the first piece of bread; everyone touches you, but nobody wants you.",
    "You’re not pretty enough to have such an ugly personality.",
    "You’re like a slinky, not really good for much but bring a smile when pushed down the stairs.",
    "Mirrors can’t talk. Lucky for you, they can’t laugh either.",
    "You’re like a cloud. When you disappear, it’s a beautiful day.",
    "Your family tree must be a cactus because everybody on it is a prick.",
    "You’re like a glow stick. I want to snap you and shake the sense into you.",
    "You have an entire life to be an idiot. Why not take today off?",
    "You’re so irrelevant, you could be the ‘Terms and Conditions’ and no one would notice.",
    "If laziness was a competition, you’d come in second because you’d be too lazy to compete.",
    "I suggest you do a little soul-searching. You might actually find one.",
    "I know I make a lot of stupid choices, but hanging out with you was the worst one of all.",
    "This will be the first and last roast of the night, as we’ve already used up your entire vocabulary.",
    "Sorry, I can’t think of an insult dumb enough for you to understand.",
    "Whenever you open your mouth, it's like, 'Whoa, somebody took too many drugs this morning.'",
    "You’re like a snowflake, unique in your own way.",
    "You’re like a rainbow, but without the colors.",
    "You’re like a broken pencil, but with more lead.",
    "You’re like a snowman, but with less snow.",
    "You’re like a cloud, but with less chance of rain.",
    "You’re like a book, but with less pages.",
    "You’re like a candle, but with less light.",
    "You’re like a carrot, but with less color.",
    "You’re like a penny, but with less value.",
    "You’re like a clock, but with less time."
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('compliment')
        .setDescription('Send good vibes to your chosen target')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to compliment')
                .setRequired(true)), // This adds a user option
    async execute(interaction) {
        const target = interaction.options.getUser('target'); // Get the user option
        const randIndex = Math.floor(Math.random() * roasts.length);
        await interaction.reply(`${target}, ${roasts[randIndex]}`); // Ping the user in the reply
    },
};