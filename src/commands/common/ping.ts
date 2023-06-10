import { Command } from '@src/structs/types/commands';
import { ApplicationCommandType } from 'discord.js';

export default new Command({
    name: 'ping',
    description: 'responderá com pong',
    type: ApplicationCommandType.ChatInput,
    async run({ interaction }) {
        interaction.reply({content: 'pong'});
    },
});