import axios from 'axios';
import { Command } from '../../structs/types/commands';
import { EmbedBuilder } from 'discord.js';

export default new Command({
    name: 'memes',
    description: 'memes do reddit',
    async run({ interaction }) {
        try {
            const memes = await axios.get(`https://raw.githubusercontent.com/LucianoDeveloper/memes-random/master/images.json`);
            const random = Math.floor(Math.random() * memes.data.images.length);
            const randomMeme = memes.data.images[random];
            if (randomMeme) {
                const embed = new EmbedBuilder()
                    .setImage(randomMeme)
                await interaction.reply({ embeds: [embed] });
            }
        } catch (error) {
            console.log(`🔴 An error occurred ${error}`.red);
        }
    },
});