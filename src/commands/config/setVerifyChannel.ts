import { Command } from '@src/structs/types/commands';
import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, Embed, EmbedBuilder } from 'discord.js';

export default new Command({
    name: 'verify',
    description: 'criar sistema de verificação',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['Administrator'],
    options: [
        {
            name: 'channel',
            description: 'qual canal vai ficar a verificação?',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run({ interaction }) {
        if (!interaction.inCachedGuild()) return;
        const channel = interaction.options.get('channel', true);
        const verifyEmbed = new EmbedBuilder()
            .setTitle('Verificação')
            .setDescription('Clique no botão abaixo para ser verificado \n e poder acessar os outros chats')
            .setColor(`#d147a3`)
        let sendChannel = interaction.reply({
            ephemeral: true,
            embeds: [verifyEmbed],
            components: [
                new ActionRowBuilder<ButtonBuilder>({
                    components: [
                        new ButtonBuilder({
                            customId: 'verify',
                            label: 'verify',
                            emoji: '✅',
                            style: ButtonStyle.Success
                        })
                    ]
                })
            ]
        });
        if (!sendChannel) {
            interaction.reply({
                content: `Ocorreu um erro. Tente novamente.`,
                ephemeral: true
            })
        } else {
            interaction.reply({
                content: `Verificado com sucesso. ✨`
            })
        }
    }
});