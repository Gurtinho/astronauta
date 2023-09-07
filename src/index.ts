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

const options = {
    method: 'POST',
    headers: {Authorization: '371436125648060428-6c258dd03c09a3171891a44473a07a6d77998c45630a705da954d368afb4ce9e'},
    body: '{"access_token":"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"}'
};

fetch('https://api.squarecloud.app/v2/apps/%7Bapp_id%7D/deploy/git-webhook', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
    
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