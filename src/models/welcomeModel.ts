import { Document, model, Schema } from 'mongoose';

export type WelcomeType = Document & {
    guild: string;
    channel: string;
    message: string;
    description: string;
    role: string;
    image: string;
}

export const welcomeSchema = new Schema({
    guild: String,
    channel: String,
    message: String,
    description: String,
    role: String,
    image: String
});

const WelcomeModel = model<WelcomeType>('Welcome', welcomeSchema);

export { WelcomeModel };