const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bko-requestresource')
        .setDescription('Request a resource at a certain location'),
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('requestResource')
            .setTitle('Resource needed');
        const resourceNeededInput = new TextInputBuilder()
            .setCustomId('resourceNeededInput')
            // The label is the prompt the user sees for this input
            .setLabel("What resource is needed?")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        const locationInput = new TextInputBuilder()
            .setCustomId('locationInput')
            .setLabel("Delivery location")
            .setStyle(TextInputStyle.Short);

        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(resourceNeededInput);
        const secondActionRow = new ActionRowBuilder().addComponents(locationInput);

        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow);

        // Show the modal to the user
        await interaction.showModal(modal);
    },
};