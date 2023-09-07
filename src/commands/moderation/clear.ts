import { Command } from '../../structs/types/commands';
import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType } from 'discord.js';

export default new Command({
    name: 'clear',
    description: 'deletar mensagens',
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ['ManageChannels'],
    options: [
        {
            name: 'amount',
            description: 'quantidade de mensagens a serem apagadas',
            type: ApplicationCommandOptionType.Number
        },
        {
            name: 'user',
            description: 'deletar mensagens de um usuário em específico',
            type: ApplicationCommandOptionType.User
        }
    ],
    async run({interaction, options}) {
        if (!interaction.inCachedGuild()) return;
        const amount = options.get('amount')?.value || 10;
        const user = options.getUser('user');
        const { guild } = interaction;
        const channel = guild?.channels;
        const logs = await channel.fetch(interaction.channelId);
        if (!logs) return;
        if (logs.type != ChannelType.GuildText) return;

        let deletedMessages: any = [];
        if (user) {
            let messagesAmount = 0;
            let filtered: any = [];
            const teste = await logs.messages.fetch({ limit: Number(amount) });
            teste.filter(msg => {
                if (msg.author.id == user.id && Number(amount) > messagesAmount) {
                    filtered.push(msg);
                    messagesAmount++;
                }
            });

            deletedMessages = await logs.bulkDelete(filtered).catch();
            
        } else {
            if (amount) {
                deletedMessages = await logs.bulkDelete(Number(amount)).catch();
            }
        }
        
        const msg = await interaction.reply({
            content: `${deletedMessages?.size} mensagens deletadas ✅`,
            fetchReply: true
        });

        if (msg) {
            setTimeout(() => {
                interaction.channel?.messages.delete(msg.id).catch();
            }, 1500);
        }
    }
});