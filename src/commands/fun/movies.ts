import { Command } from '@src/structs/types/commands';
import axios from 'axios';
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import * as dotenv from 'dotenv';

// define o tempo mínimo entre os comandos (30 segundos)
const commandCooldown = 30 * 1000;

// armazena o timestamp da última mensagem de comando do usuário
const lastCommandTimestamps = new Map();

export default new Command({
    name: 'movie',
    description: 'busca de filmes',
    options: [
        {
            name: 'name',
            description: 'ache o filme que busca',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async run({ interaction, options }) {
        dotenv.config();

        const name = options.getString('name', true);

        // obtém o timestamp atual
        const now = Date.now();
        // obtém o autor da interação
        const authorId = interaction.user.id;
        // verifica se há um timestamp armazenado para o autor
        if (lastCommandTimestamps.has(authorId)) {
            // obtém o último timestamp armazenado para o autor
            const lastTimestamp = lastCommandTimestamps.get(authorId);

            // verifica se o tempo mínimo entre os comandos já passou
            if (now - lastTimestamp < commandCooldown) {
                const remainingTime = commandCooldown - (now - lastTimestamp);
                await interaction.reply({
                    content: `Você precisa esperar ${remainingTime / 1000} segundos antes de usar este comando novamente.`,
                    ephemeral: true
                });
                return;
            }
        }

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_SECRET_KEY}&language=pt-BR&query=${name}`);
            const movies = response.data.results;

            if (movies) {
                const embed = new EmbedBuilder()
                    .setTitle(`**${movies[0].title}**`)
                    .setDescription(`${movies[0].overview}`)
                    .setImage(`https://image.tmdb.org/t/p/w500${movies[0].backdrop_path}`)
            
                await interaction.reply({ embeds: [embed] });

                // armazena o timestamp atual para o autor da interação
                lastCommandTimestamps.set(authorId, now);
            }

        } catch (error) {
            console.error(error);
        }
    },
});