import { Command } from '../../structs/types/commands';
import { ApplicationCommandOptionType, TextChannel } from 'discord.js';
import { Punishment } from '../../database/entities/Punishment';
import { dataConnection } from '../../database/data-source';
const punishmentRepository = dataConnection.getRepository(Punishment);

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
            if (!interaction.inCachedGuild()) return;
            const punishmentChannel = options.getChannel('channel', true);
            if (!interaction.guild.members.me?.permissions.has(['Administrator', 'KickMembers'])) {
                interaction.reply({
                    content: `Você não possui permissão pra fazer isso`,
                    ephemeral: true
                });
            }
            const punishmentChannelData = await punishmentRepository.findOneBy({
                guild: interaction.guild.id,
            });
            if (!punishmentChannelData) {
                const punishmentChannelCreated = await punishmentRepository.save({
                    guild: interaction.guild.id,
                    channel: punishmentChannel.id
                });
                if (punishmentChannelCreated) {
                    await interaction.reply({
                        content: `Canal de punição definido com sucesso ✅`,
                        ephemeral: true
                    });
                }
            } else {
                punishmentChannelData.channel = punishmentChannel.id;
                const punishmentChannelUpdated = await punishmentRepository.save(punishmentChannelData, {
                    data: [
                        'channel' 
                    ]
                });
                if (punishmentChannelUpdated) {
                    await interaction.reply({
                        content: `Canal de punição atualizado com sucesso ✅`,
                        ephemeral: true
                    });
                }
            }
        } catch (error) {
            return interaction.reply({
                content: 'Ocorreu um erro ao tentar setar o canal de punição.',
                ephemeral: true
            });
        }
    }
});