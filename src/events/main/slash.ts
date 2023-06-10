import { client } from '@src/bot';
import { Events } from '@src/structs/types/events';
import { CommandInteractionOptionResolver } from 'discord.js';

export default new Events({
    name: 'interactionCreate',
    async run(interaction) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        const options = interaction.options as CommandInteractionOptionResolver;
        command.run({client, interaction, options});
    },
});