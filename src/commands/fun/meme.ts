import axios from 'axios';

import { Command } from '@src/structs/types/commands';

export default new Command({
    name: 'meme',
    description: 'memes do reddit',
    async run({ interaction }) {
        try {
            const response = await axios.get('https://www.reddit.com/r/memes/random/.json');
            console.log(response.data[0].children);
        } catch (error) {
            console.error(error);
        }
    },
});