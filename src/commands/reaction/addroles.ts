import { Command } from '@src/structs/types/commands';
import { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } from 'discord.js';

export default new Command({
    name: 'addrole',
    description: 'memes do reddit',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['ManageRoles'],
    options: [
        {
            name: 'role',
            description: 'cargo para ser adicionado',
            type: ApplicationCommandOptionType.Role,
            required: true
        },
        {
            name: 'description',
            description: 'descrição do cargo',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'emoji',
            description: 'emoji para o cargo',
            type: ApplicationCommandOptionType.String
        }
    ],
    async run({ interaction, options }) {
        const role = options.getRole('role', true);
        const description = options.getString('description', false);
        const emoji = options.getString('emoji', false);
        try {
            if (role.position >= interaction.member?.highest?.position) {
                return interaction.reply({
                    content: 'Você não pode banir um membro com cargo igual ou superior ao seu.',
                    ephemeral: true,
                });
            }
        } catch (error) {
            console.log(`🔴 An error occurred ${error}`.red);
        }
    },
});