import { Command } from '../../structs/types/commands';
import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, VoiceChannel } from 'discord.js';

// ainda não terminado
export default new Command({
    name: 'setafk',
    description: 'configure o canal de AFK',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['Administrator'],
    options: [
        {
            name: 'channel',
            description: 'canal de AFK',
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildVoice],
            required: true
        }
    ],
    async run({interaction, options}) {
        if (!interaction.inCachedGuild()) return;
        const { guild } = interaction;
        const channel = options.getChannel('channel', true);
        try {
            if (channel instanceof VoiceChannel) {
                guild.setAFKChannel(channel);
            }
            interaction.reply({
                content: `Canal de voz AFK definido com sucesso ✅`
            });
        } catch (error) {
            return interaction.reply({
                content: 'Ocorreu um erro ao tentar setar o canal de AFK.',
                ephemeral: true
            });
        }
    }
});