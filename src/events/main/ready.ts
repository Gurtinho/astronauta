import { Events } from '../../structs/types/events';

export default new Events({
    name: 'interactionCreate',
    async run(interaction) {
        console.log('Online bot');
    }
});