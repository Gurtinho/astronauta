import { Command } from '@src/structs/types/commands';
import {
    APIEmbed, ApplicationCommandOptionType, EmbedBuilder,
    GuildMember, GuildMemberRoleManager, JSONEncodable, Role, TextChannel,
} from 'discord.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type IGuildMember = Pick<GuildMember, 'roles'> & GuildMemberRoleManager & {
    highest: Role;
}

export default new Command({
    name: 'ban',
    description: 'banir membro do servidor',
    defaultMemberPermissions: ['BanMembers'],
    options: [
        {
            name: 'user',
            description: 'usuário a ser banido',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'reason',
            description: 'razão pela qual o usuário está sendo banido',
            type: ApplicationCommandOptionType.String
        }
    ],
    async run({ interaction, options }) {
        if (!interaction.inCachedGuild()) return;
        const user = options.getUser('user');
        const reason = options.getString('reason');
        const memberToKick = await interaction.guild?.members.fetch(user!.id);

        if (!memberToKick) {
            return interaction.reply({
                content: 'Membro inválido.',
                ephemeral: true
            });
        }

        const authorRoles = interaction.member?.roles as IGuildMember;

        try {
            await prisma.$connect();
            if (memberToKick.roles.highest.position >= authorRoles.highest.position) {
                return interaction.reply({
                    content: 'Você não pode banir um membro com cargo igual ou superior ao seu.',
                    ephemeral: true,
                });
            }
            const punishmentData = await prisma.punishment.findFirst({
                where: {
                    guild: interaction.guild.id
                },
            });
            
            await memberToKick.ban();

            if (punishmentData?.channel) {
                const punishmentEmbedMessage = new EmbedBuilder()
                .setTitle(`Membro banido: @${memberToKick.user.tag}`)
                .setColor('Red');
                if (reason) {
                    punishmentEmbedMessage.setDescription(`Motivo: ${reason}`);
                }
                const punishmentChannel = interaction.guild?.channels.cache.get(interaction.channelId);
                if (punishmentChannel instanceof TextChannel) {
                    const embeds: (APIEmbed | JSONEncodable<APIEmbed>)[] = [punishmentEmbedMessage];
                    punishmentChannel.send({ embeds });
                }
            }
            await prisma.$disconnect();
        } catch (error) {
            return interaction.reply({
                content: 'Ocorreu um erro ao tentar expulsar o membro.',
                ephemeral: true,
            });
        }
    }
});