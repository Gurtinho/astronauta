import { Command } from '../../structs/types/commands';
import { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } from 'discord.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

export default new Command({
    name: 'youtube',
    description: 'Pesquise vídeos no youtube',
    type: ApplicationCommandType.ChatInput,
    async run({ interaction, options }) {
        dotenv.config();
        try {
            // const embed = new EmbedBuilder()
            //     .setTitle(`Clima em ${weather.name}`)
            //     .setDescription(`**${weather.weather[0].description}**`)
            //     .addFields({name: 'Temperatura', value: `${weather.main.temp}°C`})
            //     .addFields({name: 'Sensação térmica', value: `${weather.main.feels_like}°C`})
            //     .addFields({ name: 'Humidade', value: `${weather.main.humidity}%` })
            // if (images) {
            //     const randomImage = Math.floor(Math.random() * images.length);
            //     const image = images[randomImage];
            //     embed.setImage(image!)
            // }
            
            // await interaction.reply({ embeds: [embed] });
            
        } catch (error) {
            console.log(`🔴 An error occurred ${error}`.red);
        }
    },
});