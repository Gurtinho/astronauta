import { Command } from '@src/structs/types/commands';
import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';

export default new Command({
    name: 'set-antilinks',
    description: 'configure se vai ter anti-links',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['Administrator'],
    async run({interaction, options}) {
        if (!interaction.inCachedGuild()) return;

    }
});