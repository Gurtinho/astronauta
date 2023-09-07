import { Command } from '../../structs/types/commands';
import axios from 'axios';
import { EmbedBuilder } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();

// define o tempo mínimo entre os comandos (30 segundos)
const commandCooldown = 30 * 1000;

// armazena o timestamp da última mensagem de comando do usuário
const lastCommandTimestamps = new Map();

export default new Command({
    name: 'recomend-movies',
    description: 'recomendação de filmes',
    async run({ interaction, options }) {
        const now = Date.now();
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
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_SECRET_KEY}&language=pt-BR&with_genres=35`);
            const movies = response.data.results;
            if (movies) {
                const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                const embed = new EmbedBuilder()
                    .setTitle(`**Eu recomendo assistir "${randomMovie.title}!"**`)
                    .setDescription(`Sinopse: ${randomMovie.overview}`)
                    .setImage(`https://image.tmdb.org/t/p/w500${randomMovie.backdrop_path}`)
            
                await interaction.reply({ embeds: [embed] });
                // armazena o timestamp atual para o autor da interação
                lastCommandTimestamps.set(authorId, now);
            }
        } catch (error) {
            console.log(`🔴 An error occurred ${error}`.red);
        }
    },
});