import { Command } from '@src/structs/types/commands';
import {
    APIEmbed,
    ApplicationCommandOptionType,
    EmbedBuilder, TextChannel, JSONEncodable, Role,
    GuildMember, GuildMemberRoleManager, GuildBan, ActionRowBuilder, ButtonBuilder, 
} from 'discord.js';

export type IGuildMember = Pick<GuildMember, 'roles'> & GuildMemberRoleManager & {
    highest: Role;
}

export type IGuildBans = GuildBan & {
    username?: String;
    discriminator?: String;
}

export default new Command({
    name: 'unban-list',
    description: 'desbanir um membro do servidor',
    defaultMemberPermissions: ['BanMembers'],
    options: [
        {
            name: 'user',
            description: 'usuário a ser desbanido (ID ou nome de usuário#0000)',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run({ interaction, options }) {
        const user = options.getString('user');

        try {
            // const username = user!.split('#')[0];
            // const discriminator = user!.split('#')[1];

            // const punishmentData = await PunishmentModel.findOne({
            //     channel: interaction.channelId
            // }).exec();

            // const bannedUsersList = await interaction.guild?.bans.fetch();

            // const userBanned: IGuildBans | undefined = bannedUsersList?.find((userBan: IGuildBans) => {
            //     return (userBan.user.username.toLowerCase() == username.toLowerCase() && userBan.user.discriminator.toLowerCase() == discriminator.toLowerCase()) || userBan.user.id == user;
            // });

            // if (!userBanned?.user) {
            //     return interaction.reply('Usuário não encontrado na lista de banidos.');
            // }

            const confirmEmbedMessage = new EmbedBuilder()
                .setTitle('testando')
                .setDescription('testando mais ainda');
            
            // const confirmButtonMessage = new ActionRowBuilder<ButtonBuilder>({
            //     components: [
            //         new ButtonBuilder()
            //             .setCustomId('confirm-button')
            //             .setEmoji('✅')
            //             .setLabel('confirmar'),
            //         new ButtonBuilder()
            //             .setCustomId('cancel-button')
            //             .setEmoji('❌')
            //             .setLabel('cancelar')
            //     ]
            // })
            
            await interaction.reply({
                embeds: [confirmEmbedMessage],
                // components: [confirmButtonMessage]
            });
          
            // await interaction.guild?.members.unban(user);

            // if (punishmentData?.channel) {
            //     const punishmentEmbedMessage = new EmbedBuilder()
            //     .setTitle(`Membro banido: @${user?.id}`)
            //     .setColor('Red');
            //     const punishmentChannel = interaction.guild?.channels.cache.get(interaction.channelId);
            //     if (punishmentChannel instanceof TextChannel) {
            //         const embeds: (APIEmbed | JSONEncodable<APIEmbed>)[] = [punishmentEmbedMessage];
            //         punishmentChannel.send({embeds});
            //     }
            // }

            // if (interaction.channelId != punishmentData?.channel) {
            //     const msg = await interaction.reply({
            //         content: `Usuário desbanido @${user?.username}`
            //     });
            //     setTimeout(() => {
            //         msg.delete();
            //     }, 3000);
            // }

        } catch (error) {
            return interaction.reply({
                content: 'Ocorreu um erro ao tentar revocar o banimento do usuário.',
                ephemeral: true,
            });
        }
    }
});