import { Command } from '@src/structs/types/commands';
import { ApplicationCommandOptionType, Collection, Snowflake, TextChannel } from 'discord.js';
import { PunishmentModel } from '@src/models/punishmentModel';

interface ChannelCache extends Collection<Snowflake, TextChannel> {
  get(id: Snowflake): TextChannel | undefined;
}

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
        if (!interaction.inCachedGuild()) return;
        const punishmentChannel = options.getChannel('channel', true);
        if (!interaction.guild.members.me?.permissions.has(['Administrator', 'KickMembers'])) {
            interaction.reply({
                content: `Você não possui permissão pra fazer isso`,
                ephemeral: true
            });
        }
        const punishmentChannelData = await PunishmentModel.findOne({
            guild: interaction.guild.id
        }).exec();
        if (!punishmentChannelData) {
            const punishmentChannelCreated = await PunishmentModel.create({
                guild: interaction.guild.id,
                channel: punishmentChannel.id,
            });
            if (punishmentChannelCreated) {
                await interaction.reply({
                    content: `Tópico do canal configurado com sucesso ✅`,
                    ephemeral: true
                });
                if (punishmentChannel instanceof TextChannel) {
                    await punishmentChannel.setTopic(`Total de Membros: ${interaction.guild.memberCount}`);
                }
            }
        }
    }
});