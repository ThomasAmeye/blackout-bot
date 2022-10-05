const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const requests = require('./../models/requests.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bko-checkrequests')
        .setDescription('Check which outstanding requests there are still'),
    async execute(interaction) {
        // const currentRequests = [{
        //     name: '500 Bmats - Ash',
        //     value: 'Need 500 Bmats in Ash town - Rube',
        // }, {
        //     name: '9001 Gravel - HQ',
        //     value: 'Need 9001 Gravel in HQ base - Rube',
        // }];
        const currentRequests = await requests.getAllRequests();
        const formattedRequests = [];
        currentRequests.forEach(element => {
            formattedRequests.push({ 'name': element.material + " - " + element.location, 'value': 'Time: ' + new Date(element.createdAt).toLocaleString() + '  -  Requested by: ' + element.requested_by });
        });
        if (!formattedRequests.length) {
            // inside a command, event listener, etc.
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Currently no outstanding requests');
            // .setURL('https://discord.js.org/')
            // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
            // .setDescription('Some description here')
            // .setThumbnail('https://i.imgur.com/AfFp7pu.png')

            // .addFields({ name: 'Regular field title', value: 'Some value here' }, { name: '\u200B', value: '\u200B' }, { name: 'Inline field title', value: 'Some value here', inline: true }, { name: 'Inline field title', value: 'Some value here', inline: true }, )
            // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
        } else {
            // inside a command, event listener, etc.
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Current outstanding requests')
                // .setURL('https://discord.js.org/')
                // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
                // .setDescription('Some description here')
                // .setThumbnail('https://i.imgur.com/AfFp7pu.png')

            // .addFields({ name: 'Regular field title', value: 'Some value here' }, { name: '\u200B', value: '\u200B' }, { name: 'Inline field title', value: 'Some value here', inline: true }, { name: 'Inline field title', value: 'Some value here', inline: true }, )
            // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            .addFields(formattedRequests)
            await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
        }


        // .setTimestamp()
        // .setFooter({ text: 'Sent at ' }); //, iconURL: '' 


    },
};