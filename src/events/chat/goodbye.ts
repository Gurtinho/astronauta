import { Events } from '@src/structs/types/events';
import { APIEmbed, EmbedBuilder, JSONEncodable, TextChannel } from 'discord.js';

export default new Events({
    name: 'guildMemberRemove',
    async run(member) {
        const removechannel = member.guild.channels.cache.get('1103192474450665512');
        const removeEmbedMessage = new EmbedBuilder()
            .setImage('https://img.freepik.com/vetores-gratis/fundo-de-galaxia-em-aquarela-pintado-a-mao_52683-63441.jpg?w=740&t=st=1683253938~exp=1683254538~hmac=ca4bf4d54a537d65f2d276750240460631d843919ff6f04270f34e4401c70797')
            .setTitle(`Membro saiu do servidor`)
            .setDescription(`${member.user.username} foi cedo`)
            .setColor(`#d147a3`)
            .addFields({ name: `Total de membros`, value: `${member.guild.memberCount}` })
            .setTimestamp()
        
        if (removechannel instanceof TextChannel) {
            const embeds: (APIEmbed | JSONEncodable<APIEmbed>)[] = [removeEmbedMessage];
            removechannel.send({embeds});
        }
    }
});