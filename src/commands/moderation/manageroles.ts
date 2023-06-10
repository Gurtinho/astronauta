import { Command } from '@src/structs/types/commands';
import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ColorResolvable
} from 'discord.js';

export default new Command({
    name: 'role',
    description: 'criar cargos',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['ManageRoles'],
    options: [
        {
            name: 'create',
            description: 'cargo',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'nome do cargo',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    maxLength: 20
                },
                {
                    name: 'color',
                    description: 'cor do cargo',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
            ]
        },
        {
            name: 'delete',
            description: 'role',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'nome do cargo',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    maxLength: 20
                },
                {
                    name: 'color',
                    description: 'cor do cargo',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
            ]
        },
        {
            name: 'edit',
            description: 'role',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'nome do cargo',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    maxLength: 20
                },
                {
                    name: 'color',
                    description: 'cor do cargo',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
            ]
        },
    ],
    async run({ interaction, options }) {
        if (!interaction.inCachedGuild()) return;
        const { guild } = interaction;
        const name = options.getString('name', true);
        const color = options.getString('color');
        
        switch (options.getSubcommand(true)) {
            case 'create': {
                const cargo = await guild.roles.create({
                    name: name,
                    color: color as ColorResolvable
                });
                interaction.reply({
                    content: `cargo ${cargo} criado. ✅`
                });
            }
            case 'delete': {
                // const cargo = await guild.roles.delete();
                // interaction.reply({
                //     content: `cargo ${cargo} criado. ✅`
                // });
            }
            case 'edit': {
                // const cargo = await guild.roles.create({
                //     name: name,
                //     color: color as ColorResolvable
                // });
                // interaction.reply({
                //     content: `cargo ${cargo} criado. ✅`
                // });
            }
        }
    }
});