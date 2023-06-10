import { Command } from '@src/structs/types/commands';
import {
    ApplicationCommandType
} from 'discord.js';

export default new Command({
    name: 'username',
    description: 'trocar nome de usuário',
    type: ApplicationCommandType.ChatInput,
    async run({ interaction }) {
        
	}
});