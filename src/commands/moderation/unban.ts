import { Command } from '../../structs/types/commands';
import {
    ApplicationCommandOptionType,
    EmbedBuilder, Role, GuildMember, GuildMemberRoleManager,
    GuildBan, ActionRowBuilder, ButtonBuilder, ButtonStyle, 
} from 'discord.js';

export type IGuildMember = Pick<GuildMember, 'roles'> & GuildMemberRoleManager & {
    highest: Role;
}

export type IGuildBans = GuildBan & {
    username?: String;
    discriminator?: String;
}

export default new Command({
    name: 'unban',
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

        const username = user!.split('#')[0];
        const discriminator = user!.split('#')[1];

        try {
            const bannedUsersList = await interaction.guild?.bans.fetch();

            const userBanned: IGuildBans | undefined = bannedUsersList?.find((userBan: IGuildBans) => {
                return (userBan.user.username.toLowerCase() == username.toLowerCase() && userBan.user.discriminator.toLowerCase() == discriminator.toLowerCase()) || userBan.user.id == user;
            });

            if (!userBanned?.user) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle('Usuário não encontrado')
                        .setDescription('Use o comando /unban-list para olhar na lista de banidos')
                        .setTimestamp()
                    ]
                });
            } else {
                const confirmEmbedMessage = new EmbedBuilder()
                .setTitle('Usuário encontrado')
                .setDescription('Deseja mesmo desbanir esse usuário?')
                .setTimestamp()
            
                const confirmButtonMessage = new ActionRowBuilder<ButtonBuilder>({
                    components: [
                        new ButtonBuilder({
                            customId: 'confirm-button',
                            label: 'Confirmar',
                            emoji: '✅',
                            style: ButtonStyle.Success,
                        }),
                        new ButtonBuilder({
                            customId: 'cancel-button',
                            label: 'Cancelar',
                            emoji: '❌',
                            style: ButtonStyle.Danger
                        })
                    ]
                });
                
                const msg = await interaction.reply({
                    embeds: [confirmEmbedMessage],
                    components: [confirmButtonMessage]
                });
            
                const filter = (interaction: { customId: string; }) => interaction.customId.startsWith('confirm-button') || interaction.customId.startsWith('cancel-button');
                const collector = interaction.channel?.createMessageComponentCollector({filter, time: 10000});
                
                collector!.on('collect', async (buttonInteraction) => {
                    if (buttonInteraction.customId === 'confirm-button') {
                        await interaction.guild?.members.unban(userBanned.user.id);

                        const unbanEmbedMessage = new EmbedBuilder()
                            .setTitle(`Membro desbanido: @${userBanned.user.id}`)
                            .setDescription('Essa mensagem se auto destruirá em 3 segundos...')
                            .setColor('Red');
                            const msg = await interaction.editReply({
                                embeds: [unbanEmbedMessage],
                                components: []
                            });
                        
                        setTimeout(() => {
                            msg.delete();
                        }, 3000);
                        
                    } else if (buttonInteraction.customId === 'cancel-button') {
                        msg.delete();
                    }
                });
            }
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'Ocorreu um erro ao tentar revocar o banimento do usuário.',
                ephemeral: true,
            });
        }
    }
});