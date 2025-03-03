const { SlashCommandBuilder } = require('discord.js');

const compliments = [
    "Your smile is contagious.",
    "You have the best laugh.",
    "You light up the room.",
    "You have a great sense of humor.",
    "You're like sunshine on a rainy day.",
    "You bring out the best in other people.",
    "There's just something about you that shines.",
    "Colors seem brighter when you're around.",
    "You always know how to have fun.",
    "Jokes are funnier when you tell them.",
    "You're the best at finding silver linings.",
    "You always know what to say to make me feel better.",
    "Being around you is like a happy little vacation.",
    "You're more fun than bubble wrap.",
    "You're like a breath of fresh air.",
    "You're someone's reason to smile.",
    "You're the only person who can always make me laugh.",
    "I appreciate you.",
    "You are perfect just the way you are.",
    "You are enough.",
    "On a scale from 1 to 10, you're an 11.",
    "You've got all the right moves.",
    "Everything would be better if more people were like you.",
    "You are an incredible human.",
    "You're wonderful.",
    "You're one of a kind.",
    "Whoever raised you deserves a medal for a job well-done.",
    "Time spent with you is always worth it.",
    "In high school, I bet you were voted 'Best, period.'",
    "If you were a scented candle, you'd be the rare one that actually smells like what it's supposed to.",
    "There's ordinary, and then there's you.",
    "You're even better than a unicorn because you're real.",
    "You're really something special.",
    "I am so proud of you, and I hope you are too!",
    "You are making a difference.",
    "You deserve all the credit you're getting.",
    "You're a great example to others.",
    "Actions speak louder than words, and yours tell an incredible story.",
    "You're even more beautiful on the inside than you are on the outside.",
    "Your ability to recall random factoids at just the right time is impressive.",
    "You always know -- and say -- exactly what I need to hear when I need to hear it.",
    "You may dance like no one's watching, but everyone's watching because you're an amazing dancer!",
    "When you're not afraid to be yourself is when you're most incredible.",
    "You're more fun than a ball pit filled with candy. (And seriously, what could be more fun than that?)",
    "That thing you don't like about yourself is what makes you so interesting.",
    "Every day with you is a blessing.",
    "You are a true inspiration.",
    "Your endless positivity is contagious.",
    "You have an incredible sense of style.",
    "You always know how to make me feel special.",
    "Your determination and work ethic are truly admirable.",
    "You are such a genuine and authentic person."
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('actual-compliment')
        .setDescription('I promise that they are actually nice this time-')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to compliment')
                .setRequired(true)), // This adds a user option
    async execute(interaction) {
        const target = interaction.options.getUser('target'); // Get the user option
        const randIndex = Math.floor(Math.random() * compliments.length);
        await interaction.reply(`${target}, ${compliments[randIndex]}`); // Ping the user in the reply
    },
};