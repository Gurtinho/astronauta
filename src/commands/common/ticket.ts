import { Command } from '../../structs/types/commands';
import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    EmbedBuilder
} from 'discord.js';
import * as dotenv from 'dotenv';

export default new Command({
    name: 'ticket',
    description: 'envie um email para o desenvolvedor',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'subject',
            description: 'assunto a ser tratado',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'text',
            description: 'mensagem que deseja enviar',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run({interaction, options}) {
        if (!interaction.inCachedGuild()) return;
        const username = interaction.user.username;
        const userId = interaction.user.id;
        const messageSubject = options.getString('subject');
        const messageText = options.getString('text');
        dotenv.config();

        const user = await interaction.client.users.fetch(String(process.env.MY_USERID));

        const userSender = await interaction.client.users.fetch(userId);
        console.log(userSender);

        const ticketEmbedMessage = new EmbedBuilder()
            .setTitle(`Novo ticket`)
            .addFields(
                {
                    name: 'Usuário:', value: `@${userSender.username}#${userSender.discriminator}`
                },
                {
                    name: 'Assunto do ticket:',
                    value: `${messageSubject}`
                },
                {
                    name: 'Mensagem:',
                    value: `${messageText}`
                }
            )
            .setTimestamp()

        await user.send({embeds: [ticketEmbedMessage]});

        await interaction.reply({
            content: `Ticket enviado com sucesso`,
            ephemeral: true
        });
    }
});