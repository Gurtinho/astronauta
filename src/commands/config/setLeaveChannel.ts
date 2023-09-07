import { Command } from '../../structs/types/commands';
import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default new Command({
    name: 'set-leave',
    description: 'configurar mensagem de boas vindas',
    defaultMemberPermissions: ['ManageGuild', 'SendMessages'],
    options: [
        {
            name: 'channel',
            description: 'canal a ser configurado a mensagem',
            type: ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: 'message',
            description: 'mensagem a ser configurada no canal',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'description',
            description: 'uma descrição qualquer...',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'role',
            description: 'cargo que vai ser adicionado ao novo membro',
            type: ApplicationCommandOptionType.Role
        },
        {
            name: 'image',
            description: 'link da imagem na mensagem de boas vindas',
            type: ApplicationCommandOptionType.String
        }
    ],
    async run({ interaction, options }) {
        if (!interaction.inCachedGuild()) return;
        const welcomeChannel = options.getChannel('channel', true);
        const welcomeMessage = options.getString('message', true);
        const welcomeDescription = options.getString('description');
        const welcomeRole = options.getRole('role');
        const welcomeImage = options.getString('image');
        try {
            if (!interaction.guild.members.me?.permissions.has(PermissionFlagsBits.SendMessages)) {
                interaction.reply({
                    content: `Você não possui permissão pra fazer isso`,
                    ephemeral: true
                });
            }
            // const welcomeData = await WelcomeModel.findOne({ guild: interaction.guild.id }).exec();
            // if (!welcomeData) {
            //     const welcomeCreated = await WelcomeModel.create({
            //         guild: interaction.guild.id,
            //         channel: welcomeChannel.id,
            //         message: welcomeMessage,
            //         description: welcomeDescription,
            //         role: welcomeRole?.id,
            //         image: welcomeImage
            //     });
            //     if (welcomeCreated) {
            //         await interaction.reply({
            //             content: `Canal de boas vindas configurado com sucesso`,
            //             ephemeral: true
            //         });
            //     }
            // }
        } catch (error) {
            return interaction.reply({
                content: 'Ocorreu um erro ao tentar setar o canal de saída.',
                ephemeral: true
            });
        }
    }
});