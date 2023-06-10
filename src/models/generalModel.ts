import { Document, model, Schema } from 'mongoose';

export type GeneralType = Document & {
    guild: string;
    badwords: string;
    antilinks: string;
}

export const generalSchema = new Schema({
    guild: String,
    badwords: String,
    antilinks: String,
});

const GeneralModel = model<GeneralType>('General', generalSchema);

export { GeneralModel };