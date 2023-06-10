import { Command } from '@src/structs/types/commands';
import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, VoiceChannel } from 'discord.js';

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
        if (channel instanceof VoiceChannel) {
            guild.setAFKChannel(channel);
        }
        interaction.reply({
            content: `Canal de voz AFK definido com sucesso ✅`
        });
    }
});