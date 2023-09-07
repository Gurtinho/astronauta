import { ClientBot } from './structs/client';
import { PresenceData } from 'discord.js';
import * as dotenv from 'dotenv';
export * from 'colors';
dotenv.config();

const client = new ClientBot();
export { client };

export type IActivity = PresenceData & {
    status: string;
    activity: {
        name: string;
        type: string;
    }
}
    
const bot = async () => {
    try {
        await client.login(process.env.BOT_TOKEN);
        client.registerModules();
        client.registerEvents();
        client.user?.setPresence({
            status: 'online'
        } as IActivity);
    } catch (error) {
        console.log(`🔴 An error occurred ${error}`.red);
    }
};
bot();