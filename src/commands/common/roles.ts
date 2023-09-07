import { Command } from '../../structs/types/commands';
import { ApplicationCommandType } from 'discord.js';

export default new Command({
    name: 'roles',
    description: 'gerenciamento de cargos',
    type: ApplicationCommandType.ChatInput,
    run({ interaction }) {
        if (!interaction.inCachedGuild()) return;
        const { guild, member } = interaction;
        interaction.reply({
            content: `cargo mais alto ${guild.roles.highest}`
        });
    }
});