const { SlashCommandBuilder } = require('discord.js');

// Global variable for storing the interval
let hauntInterval;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('summonshadow')
        .setDescription('Summons Sevagoth’s shadow to haunt the server'),

    async execute(interaction) {
        const summoner = interaction.user.toString();

        // Reply to the summoner and announce the shadow's presence
        await interaction.reply({
            content: `🌑 The Shadow has emerged... Sevagoth’s specter haunts the server, summoned by ${summoner}! 🌑`,
            ephemeral: false
        });

        // Clear any existing interval if the shadow was summoned before without being banished
        if (hauntInterval) clearInterval(hauntInterval);

        // Start a timed message that sends haunting messages every 30 seconds
        hauntInterval = setInterval(async () => {
            const hauntMessages = [
                "💀 The Shadow lurks in the darkness...",
                "🕯️ You feel an eerie chill as Sevagoth’s shadow watches...",
                "🌑 The Void whispers... Do you hear it?",
                "💀 A shadow moves, just out of sight...",
                "👁️ Beware... Sevagoth’s gaze is upon you."
            ];

            // Select a random message
            const randomMessage = hauntMessages[Math.floor(Math.random() * hauntMessages.length)];

            // Fetch all members in the channel's guild
            const members = await interaction.guild.members.fetch();
            const onlineMembers = members.filter(member => !member.user.bot && member.presence?.status === 'online');
            const randomUser = onlineMembers.random();

            // Send a haunting message with a ping to a random online user
            if (randomUser) {
                interaction.channel.send(`${randomMessage} ${randomUser}`);
            } else {
                interaction.channel.send(randomMessage); // Send without ping if no user is online
            }
        }, 10000); // Every 30 seconds
    },
};
