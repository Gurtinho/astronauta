import { Document, model, Schema } from 'mongoose';

export type TopicType = Document & {
    guild: string;
    channel: string;
}

export const topicSchema = new Schema({
    guild: String,
    channel: String
});

const TopicModel = model<TopicType>('Topic', topicSchema);

export { TopicModel };