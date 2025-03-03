const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');

const PRODUCT_URL = "https://ecommerce.datablitz.com.ph/collections/all/products/samsung-odyssey-g6-ls27dg602sexxp-27-qhd-2560x1440-360hz-0-03ms-gtg-hdr10-oled-flat-gaming-monitor";

let cronJob = null; // Store the cron job reference

async function fetchStockStatus() {
    try {
        const { data } = await axios.get(PRODUCT_URL);
        const $ = cheerio.load(data);
        
        // Check if the page contains "Sold out" text
        let stockStatus = $("body").text().includes("Sold out") ? "❌ **Sold Out**" : "✅ **In Stock!**";

        return stockStatus;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return "⚠️ Error checking stock. Try again later!";
    }
}

async function sendStockUpdate(client) {
    const stockStatus = await fetchStockStatus();
    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID); // Fetch the notification channel
    if (channel) {
        channel.send(`🛒 **Samsung Odyssey G6 Stock Update**\n\n${stockStatus}\n🔗 [View Product](${PRODUCT_URL})`);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkstock')
        .setDescription('Setup daily stock notifications at 8:00 AM Philippine Time'),
        
    async execute(interaction) {
        await interaction.deferReply(); // Show bot is thinking

        if (cronJob) {
            await interaction.editReply("✅ The daily stock check is **already scheduled** at **8:00 AM PST**.");
            return;
        }

        // Schedule cron job to run at 8:00 AM Philippine Standard Time (UTC+8)
        cronJob = cron.schedule('0 0 0 * * *', async () => {
            console.log("Running scheduled stock check...");
            await sendStockUpdate(interaction.client);
        }, {
            scheduled: true,
            timezone: "Asia/Manila" // Ensure it runs at 8:00 AM Philippine Time
        });

        await interaction.editReply("✅ **Daily stock check scheduled at 8:00 AM Philippine Time!**\nYou will receive updates in the configured Discord channel.");
    },
};