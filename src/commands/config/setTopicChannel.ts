import { Command } from '../../structs/types/commands';
import {
    ApplicationCommandOptionType, Collection,
    PermissionFlagsBits, Snowflake, TextChannel
} from 'discord.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
interface ChannelCache extends Collection<Snowflake, TextChannel> {
  get(id: Snowflake): TextChannel | undefined;
}

export default new Command({
    name: 'set-topic',
    description: 'configurar contagem de membros do servidor',
    defaultMemberPermissions: ['Administrator'],
    options: [
        {
            name: 'channel',
            description: 'canal a ser configurado o tópico',
            type: ApplicationCommandOptionType.Channel,
            required: true
        }
    ],
    async run({ interaction, options }) {
        if (!interaction.inCachedGuild()) return;
        const channelTopicChannel = options.getChannel('channel', true);
        try {
            if (!interaction.guild.members.me?.permissions.has(['Administrator', 'ManageChannels', 'ManageGuild'])) {
                interaction.reply({
                    content: `Você não possui permissão pra fazer isso`,
                    ephemeral: true
                });
            }
            // const channelTopicData = await TopicModel.findOne({
            //     guild: interaction.guild.id
            // }).exec();
            // if (!channelTopicData) {
            //     const channelTopicCreated = await TopicModel.create({
            //         guild: interaction.guild.id,
            //         channel: channelTopicChannel.id
            //     });
            //     if (channelTopicCreated) {
            //         await interaction.reply({
            //             content: `Tópico do canal configurado com sucesso ✅`,
            //             ephemeral: true
            //         });
            //         if (channelTopicChannel instanceof TextChannel) {
            //             await channelTopicChannel.setTopic(`Total de Membros: ${interaction.guild.memberCount}`);
            //         }
            //     }
            // } else {
            //     if (interaction.guild.channels.cache) {
            //         const channelOld = interaction.guild.channels.cache?.get(channelTopicData.channel);
            //         if (channelOld == channelTopicChannel) {
            //             return await interaction.reply({
            //                 content: `Esse canal já está configurado`,
            //                 ephemeral: true
            //             });
            //         }
            //         if (channelOld instanceof TextChannel) await channelOld.setTopic('');
            //     }
            //     const filter = { guild: interaction.guild.id };
            //     const update = { channel: channelTopicChannel.id };
            //     await TopicModel.updateOne(filter, update);
            //     if (channelTopicChannel instanceof TextChannel) {
            //         await channelTopicChannel.setTopic(`Total de Membros: ${interaction.guild.memberCount}`);
            //     }
            //     const msg = await interaction.reply({
            //         content: `O canal foi atualizado para #${channelTopicChannel.name}`,
            //         ephemeral: true
            //     });
            //     setTimeout(() => {
            //         msg.delete()
            //     }, 1500);
            // }
        } catch (error) {
            return interaction.reply({
                content: 'Ocorreu um erro ao tentar setar o canal de tópico.',
                ephemeral: true
            });
        }
    }
});