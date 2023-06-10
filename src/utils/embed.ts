import { ColorResolvable, EmbedBuilder } from 'discord.js';

interface IEmbedMessage {
    title: string;
    description: string;
    image: string;
    color: ColorResolvable;
    fields: {
        name: string;
        value: string;
        inline: boolean;
    }
}

export default ({title, description, image, color, fields}: IEmbedMessage) => {
    const embedMessage = new EmbedBuilder()
    .setTimestamp()
    if (title) {
        embedMessage.setTitle(title)
    }
    if (description) {
        embedMessage.setDescription(description)
    }
    if (image) {
        embedMessage.setImage(image)
    }
    if (color) {
        embedMessage.setColor(color)
    }
    if (fields) {
        embedMessage.setFields(fields)
    }
    return embedMessage;
};