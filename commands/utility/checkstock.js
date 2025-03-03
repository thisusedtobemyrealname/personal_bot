const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

const PRODUCT_URL = "https://ecommerce.datablitz.com.ph/collections/all/products/samsung-odyssey-g6-ls27dg602sexxp-27-qhd-2560x1440-360hz-0-03ms-gtg-hdr10-oled-flat-gaming-monitor";

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

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkstock')
        .setDescription('Check if the Samsung Odyssey G6 is in stock'),
        
    async execute(interaction) {
        await interaction.deferReply(); // Show bot is thinking

        const stockStatus = await fetchStockStatus();
        const replyMessage = `🛒 **Samsung Odyssey G6 Stock Update**\n\n${stockStatus}\n🔗 [View Product](${PRODUCT_URL})`;

        await interaction.editReply({ content: replyMessage });
    },
};