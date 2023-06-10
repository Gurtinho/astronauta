import { Command } from '@src/structs/types/commands';
import { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } from 'discord.js';
import { google } from 'googleapis';
import axios from 'axios';
import * as dotenv from 'dotenv';

interface IWeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}

export default new Command({
    name: 'climate',
    description: 'ver o clima em várias regiões do mundo',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'city',
            description: 'buscar clima na cidade',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run({ interaction, options }) {
        dotenv.config();

        const city = options.getString('city', true);

        try {
            // Conexão com a api de tempo
            const response = await axios.get<IWeatherData>(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}&lang=pt_br&units=metric`
            );
            const weather = response.data;

            const customsearch = google.customsearch('v1');
            const res = await customsearch.cse.list({
                cx: process.env.ID_MECANISMO_PESQUISA,
                q: city,
                auth: process.env.GOOGLE_API_IMAGES_KEY,
                searchType: 'image',
            });
            const images = res.data?.items?.map((item) => item.link);

            const embed = new EmbedBuilder()
                .setTitle(`Clima em ${weather.name}`)
                .setDescription(`**${weather.weather[0].description}**`)
                .addFields({name: 'Temperatura', value: `${weather.main.temp}°C`})
                .addFields({name: 'Sensação térmica', value: `${weather.main.feels_like}°C`})
                .addFields({ name: 'Humidade', value: `${weather.main.humidity}%` })
            if (images) {
                const randomImage = Math.floor(Math.random() * images.length);
                const image = images[randomImage];
                embed.setImage(image!)
            }
            
            await interaction.reply({ embeds: [embed] });
            
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'Ocorreu um erro ao buscar o clima da cidade informada.',
                ephemeral: true,
            });
        }
    },
});