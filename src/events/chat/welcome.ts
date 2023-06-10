import { Events } from '@src/structs/types/events';
import { APIEmbed, EmbedBuilder, JSONEncodable, TextChannel } from 'discord.js';
import { WelcomeModel } from '@src/models/welcomeModel';

export default new Events({
    name: 'guildMemberAdd',
    async run(member) {
        const data = await WelcomeModel.findOne({ guild: member.guild.id }).exec();
        if (!data) return;
        const description = data.description;
        const image = data.image;
        const message = data.message;
        const role = data.role;
        const welcomeChannel = member.guild.channels?.cache.get(data.channel);
        const welcomeEmbedMessage = new EmbedBuilder()
            .setTitle(message)
            .addFields({
                name: 'Total de membros:',
                value: `${member.guild.memberCount}`
            })
            .setTimestamp()
        if (description) welcomeEmbedMessage.setDescription(description);
        if (image) welcomeEmbedMessage.setImage(image);
        if (welcomeChannel instanceof TextChannel) {
            const embeds: (APIEmbed | JSONEncodable<APIEmbed>)[] = [welcomeEmbedMessage];
            if(role) member.roles.add(role);
            welcomeChannel.send({embeds});
        }
    }
});