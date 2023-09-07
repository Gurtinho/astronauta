import { Events } from '../../structs/types/events';
import { TextChannel } from 'discord.js';

interface IChannelTopic extends TextChannel {
    topic: string | null;
}

export default new Events({
    name: 'guildMemberAdd',
    async run(member) {
        // const data = await TopicModel.findOne({ guild: member.guild.id }).exec();
        // if (!data) return; 
        // const channel = await member.client.channels.fetch(data.channel);
        // if (channel) {
        //     const textChannel = channel as IChannelTopic;
        //     setTimeout(async () => {
        //         await textChannel.setTopic(`Total de membros: ${member.guild.memberCount}`);
        //     }, 10000);
        // }
    }
});