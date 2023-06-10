import { client } from '@src/bot';
import { Events } from '@src/structs/types/events';

// Vai reagir caso alguem fale o nome dele
export default new Events({
    name: 'messageCreate',
    async run(message) {
        if (message.author.bot) return;
        if (client?.user?.username) {
            const messageLower = message.content.toLowerCase();
            const messageregex = /astronauta/;
            if (messageregex.test(messageLower)) {
                if (messageLower.includes(client?.user?.username.toLowerCase())) {
                    await message.react('👀');
                }
            }
        }
    },
});