import { Events } from '../../structs/types/events';
import BadWordsFilter from 'bad-words';
import Filter from 'bad-words';

export interface WordsFilter extends BadWordsFilter {
  test(text: string): boolean;
}

const customFilter = new Filter() as WordsFilter;

export default new Events({
    name: 'messageCreate',
    async run(message) {
        if (message.author.bot) return;
        const messageLower = message.content.toLowerCase();
        if (customFilter.isProfane(messageLower)) {
            message.channel.delete();
            const msg = await message.reply({
                content: `Aqui não brow, se controla ai`
            });
            if (msg) {
                setTimeout(() => {
                    message.channel?.messages.delete(msg.id).catch();
                }, 1500);
            }
        }
    },
});