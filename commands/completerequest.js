const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const requests = require('../models/requests.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bko-completerequest')
        .setDescription('Request a resource at a certain location'),
    async execute(interaction) {
        // if (interaction.member.roles.cache.some(role => role.name === 'Admin')) {
        const currentRequests = await requests.getAllRequests();
        const formattedRequests = [];
        currentRequests.forEach(element => {
            formattedRequests.push({ 'label': element.material + " - " + element.location, 'description': 'Time: ' + new Date(element.createdAt).toLocaleString(), 'value': '' + element.id });
        });
        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId('completedResource')
                .setPlaceholder('Nothing selected')
                .addOptions(formattedRequests),
            );

        await interaction.reply({ content: 'Select which request was completed!', components: [row], ephemeral: true });
        // } else {
        //     await interaction.reply({ content: "You don't have the correct role for this command!", ephemeral: true });
        // }

    },
};