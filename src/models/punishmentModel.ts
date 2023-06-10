import { Document, model, Schema } from 'mongoose';

export type PunishmentType = Document & {
    guild: string;
    channel: string;
}

export const punishmentSchema = new Schema({
    guild: String,
    channel: String
});

const PunishmentModel = model<PunishmentType>('Punishment', punishmentSchema);

export { PunishmentModel };