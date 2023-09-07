import { Command } from '../../structs/types/commands';
import {
    ApplicationCommandOptionType, EmbedBuilder,
    GuildMember, GuildMemberRoleManager, PermissionFlagsBits, Role
} from 'discord.js';
import ms from 'ms';

type IGuildMember = Pick<GuildMember, 'roles'> & GuildMemberRoleManager & {
    highest: Role;
}

export default new Command({
    name: 'mute',
    description: 'mutar um usuário',
    defaultMemberPermissions: ['ModerateMembers'],
    options: [
        {
            name: 'user',
            description: 'usuário que será mutado',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'time',
            description: 'tempo que o usuário ficará mutado',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'reason',
            description: 'razão pela qual o usuário ficará mutado',
            type: ApplicationCommandOptionType.String
        }
    ],
    async run({ interaction, options }) {
        const user = options.getUser('user', true);
        const member = await interaction.guild?.members.fetch(user!.id);
        const time = options.getString('time') || '1h';
        const reason = options.getString('reason');
        const duration = ms(time) || 3600000;

        // 604800000 = 1 week 
        if (duration >= 604800000) {
            return interaction.reply({
                content: `O tempo máximo foi excedido. Use o comando /mutehard pra mutar indefinidamente`,
                ephemeral: true
            });
        }
        
        const successEmbed = new EmbedBuilder()
            .setTitle(`**✅ Mutado**`)
            .setDescription(`Usuário mutado ${user}`)
            .setColor('Green')
            .addFields(
                { name: 'Razão', value: `${reason}`, inline: true },
                { name: 'Duração', value: `${duration}`, inline: true }
            )
            .setTimestamp();
        
        const authorRoles = interaction.member?.roles as IGuildMember;

        if (member!.roles.highest.position >= authorRoles.highest.position) {
            return interaction.reply({
                content: 'Você não pode mutar um membro com cargo igual ou superior ao seu.',
                ephemeral: true
            });
        }

        if (!interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({
                content: 'Você não possui permissão para mutar alguém.',
                ephemeral: true,
            });
        }

        if (!duration) {
            return interaction.reply({
                content: 'Precisa digitar um valor de tempo válido.',
                ephemeral: true,
            });
        }

        try {
            await member?.timeout(duration, reason as string);
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
