const requests = require('../models/requests.js');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        // console.log(interaction);
        if (interaction.member.roles.cache.some(role => role.name === 'Foxhole')) {
            if (interaction.isChatInputCommand()) {
                const command = interaction.client.commands.get(interaction.commandName);

                if (!command) return;

                try {
                    await command.execute(interaction);
                } catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
            if (interaction.isModalSubmit()) {
                // check what got submitted
                switch (interaction.customId) {
                    case "requestResource":
                        console.log("CREATING NEW REQUEST");
                        const resourceNeeded = interaction.fields.getTextInputValue('resourceNeededInput');
                        const location = interaction.fields.getTextInputValue('locationInput');
                        const user = interaction.user.tag;
                        console.log({ resourceNeeded, location, user });
                        const currentRequests = await requests.createRequest({ resourceNeeded, location, user });
                        console.log(currentRequests);
                        await interaction.reply({ content: 'Your request was received successfully!', ephemeral: true });
                        break;
                    default:
                        console.log(interaction.customId);
                        break;
                }
            }
            if (interaction.isSelectMenu()) {
                console.log("COMPLETION:");
                console.log(interaction.values[0]);
                const data = { completed_by: interaction.user.tag, id: interaction.values[0] };
                const updateRequest = await requests.updateRequest(data);
                console.log(updateRequest);
                await interaction.reply({ content: 'The request was succesfully removed!', ephemeral: true });
            };
        } else {
            await interaction.reply({ content: "You don't have the right role to use this command! You need the foxhole role", ephemeral: true });
        }
    },
};