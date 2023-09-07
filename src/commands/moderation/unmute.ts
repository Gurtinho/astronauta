import { Command } from '@src/structs/types/commands';
import {
    ApplicationCommandOptionType, EmbedBuilder,
    GuildMember, GuildMemberRoleManager, PermissionFlagsBits, Role
} from 'discord.js';

type IGuildMember = Pick<GuildMember, 'roles'> & GuildMemberRoleManager & {
    highest: Role;
}

export default new Command({
    name: 'unmute',
    description: 'desmutar um usuário',
    defaultMemberPermissions: ['ModerateMembers'],
    options: [
        {
            name: 'user',
            description: 'usuário que será desmutado',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    async run({ interaction, options }) {
        const user = options.getUser('user', true);
        const member = await interaction.guild?.members.fetch(user!.id);
        
        const successEmbed = new EmbedBuilder()
            .setTitle(`**✅ Mutado**`)
            .setDescription(`Usuário desmutado ${user}`)
            .setColor('Green')
            .setTimestamp();
        
        const authorRoles = interaction.member?.roles as IGuildMember;

        if (member!.roles.highest.position >= authorRoles.highest.position) {
            return interaction.reply({
                content: 'Você não pode desmutar um membro com cargo igual ou superior ao seu.',
                ephemeral: true,
            });
        }

        if (!interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({
                content: 'Você não possui permissão para desmutar alguém.',
                ephemeral: true
            });
        }

        try {
            await member?.timeout(null);
            const msg = await interaction.reply({
                embeds: [successEmbed]
            });
            setTimeout(() => {
                msg.delete();
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }
});