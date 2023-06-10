import { Events } from '@src/structs/types/events';

export default new Events({
    name: 'interactionCreate',
    async run(interaction) {
        console.log('Online bot');
    }
});