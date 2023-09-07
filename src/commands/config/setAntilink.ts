import { Command } from '../../structs/types/commands';
import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default new Command({
    name: 'set-antilinks',
    description: 'configure se vai ter anti-links',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['Administrator'],
    async run({interaction, options}) {
        if (!interaction.inCachedGuild()) return;
        try {

        } catch (error) {
            return interaction.reply({
                content: 'Ocorreu um erro ao tentar setar a configuração de antilinks.',
                ephemeral: true
            });
        }
    }
});