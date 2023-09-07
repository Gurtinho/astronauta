import { Command } from '../../structs/types/commands';
import { ApplicationCommandType, EmbedBuilder } from 'discord.js';

export default new Command({
    name: 'panel',
    description: 'memes do reddit',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['ManageRoles'],
    async run({ interaction }) {
        try {
            
        } catch (error) {
            console.log(`🔴 An error occurred ${error}`.red);
        }
    },
});