import { Command } from '../../structs/types/commands';
import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';

export default new Command({
    name: 'rename',
    description: 'renomear o servidor',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['ManageGuild'],
    options: [
        {
            name: 'name',
            description: 'novo nome para o servidor',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run({interaction, options}) {
        if (!interaction.inCachedGuild()) return;
        const { guild } = interaction;
        const name = options.getString('name', true);
        await guild.setName(name);
        
        interaction.reply({
            content: `Nome da guilda alterado com sucesso ✅`
        });
    }
});