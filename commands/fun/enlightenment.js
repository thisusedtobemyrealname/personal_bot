const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('enlightenment')
        .setDescription('Oh you know what this does...'),
    async execute(interaction) {
        console.log("STARTING OPERATION...");
        let validUrlFound = false;
        let url = '';

        // Wrap the loop in a function that returns a promise
        const findValidUrl = () => {
            return new Promise(async (resolve, reject) => {
                while (!validUrlFound) {
                    console.log("GENERATING NUKE CODES...");
                    const code = Math.floor(Math.random() * 900000) + 100000;
                    console.log(`DONE! ${code}`);
                    console.log("ASSEMBLING URL...");
                    const baseUrl = 'https://nhentai.net/g/';
                    url = `${baseUrl}${code}/`;
                    console.log(`DONE! ${url}`);

                    console.log("FETCHING URL...")
                    try {
                        console.log("STILL FETCHING...");
                        const response = await fetch(url);
                        if (response.ok) {
                            console.log(`URL exists: ${url}`);
                            validUrlFound = true;
                            resolve(url); // Resolve the promise with the valid URL
                        }
                    } catch (error) {
                        console.log("FAILED.");
                        console.error(error);
                        await interaction.reply('An error occurred while checking the URL.');
                        reject(error); // Reject the promise if an error occurs
                    }
                }
            });
        };

        // Await the findValidUrl function
        try {
            url = await findValidUrl();
            console.log("OPERATION FINISHED");
            await interaction.reply(`The URL ${url} exists!`);
        } catch (error) {
            console.error("Error finding valid URL:", error);
        }
    },
};
