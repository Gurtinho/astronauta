import { Document, model, Schema } from 'mongoose';

export type LeaveType = Document & {
    guild: string;
    channel: string;
    message: string;
    description: string;
    role: string;
    image: string;
    reason: string;
}

export const leaveSchema = new Schema({
    guild: String,
    channel: String,
    message: String,
    description: String,
    role: String,
    image: String,
    reason: String
});

const LeaveModel = model<LeaveType>('Leave', leaveSchema);

export { LeaveModel };