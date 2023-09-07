import { Command } from '../../structs/types/commands';

export default new Command({
    name: 'dice',
    description: 'jogue os dados',
    async run({ interaction }) {
        try {
            const result = Math.floor(Math.random() * 6) + 1;
            interaction.reply({ content: `O resultado do dado foi ${result}!` });
        } catch (error) {
            console.log(`🔴 An error occurred ${error}`.red);
        }
    },
});