import { Command } from '@src/structs/types/commands';
import { ApplicationCommandOptionType, TextChannel } from 'discord.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default new Command({
    name: 'set-punishment',
    description: 'configurar o canal de punishment (kick, ban e mute)',
    defaultMemberPermissions: ['Administrator'],
    options: [
        {
            name: 'channel',
            description: 'canal a ser configurado',
            type: ApplicationCommandOptionType.Channel,
            required: true
        }
    ],
    async run({ interaction, options }) {
        try {
            await prisma.$connect();
            if (!interaction.inCachedGuild()) return;
            const punishmentChannel = options.getChannel('channel', true);
            if (!interaction.guild.members.me?.permissions.has(['Administrator', 'KickMembers'])) {
                interaction.reply({
                    content: `Você não possui permissão pra fazer isso`,
                    ephemeral: true
                });
            }
            const punishmentChannelData = await prisma.punishment.findFirst({
                where: {
                    guild: interaction.guild.id,
                },
            });
            if (!punishmentChannelData) {
                const punishmentChannelCreated = await prisma.punishment.create({
                    data: {
                        guild: interaction.guild.id,
                        channel: punishmentChannel.id
                    }
                });
                if (punishmentChannelCreated) {
                    await interaction.reply({
                        content: `Canal de punição definido com sucesso ✅`,
                        ephemeral: true
                    });
                }
            } else {
                const punishmentChannelUpdated = await prisma.punishment.update({
                    where: {
                        id: punishmentChannelData.id
                    },
                    data: {
                        channel: punishmentChannel.id
                    }
                });
                if (punishmentChannelUpdated) {
                    await interaction.reply({
                        content: `Canal de punição atualizado com sucesso ✅`,
                        ephemeral: true
                    });
                }
            }
            await prisma.$disconnect();
        } catch (error) {
            return interaction.reply({
                content: 'Ocorreu um erro ao tentar setar o canal de punição.',
                ephemeral: true
            });
        }
    }
});