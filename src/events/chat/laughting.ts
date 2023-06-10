import { Events } from '@src/structs/types/events';

const lastMessageTimes = new Map();

export default new Events({
    name: 'messageCreate',
    async run(message) {
        if (message.author.bot) return;
        const messageLower = message.content.toLowerCase();
        const messageregex = /kkkk/g;
        const matches = messageLower.match(messageregex);
        if (messageregex.test(messageLower)) {

            const guildId = message.guild?.id;
            const lastMessageTime = lastMessageTimes.get(guildId);
            const currentTime = Date.now();

            if (!lastMessageTime || currentTime - lastMessageTime >= 600000) {
                if (matches && matches![0].length > 3) {
                    await message.react('🤣');
                }
                lastMessageTimes.set(guildId, currentTime);
            }
        }
    }
});