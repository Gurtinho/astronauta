import fs from 'fs';
import path from 'path';
import {
    ApplicationCommandDataResolvable, BitFieldResolvable, Client, ClientEvents,
    Collection, GatewayIntentBits, Partials, GatewayIntentsString
} from 'discord.js';
import { CommandType } from './types/commands';
import { EventType } from './types/events';

class ClientBot extends Client {
    
    constructor() {
        super({
            intents: [
                Object.keys(GatewayIntentBits) as BitFieldResolvable<GatewayIntentsString, number>
            ],
            partials: [
                Partials.User, Partials.Channel, Partials.Message, Partials.ThreadMember,
                Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Reaction
            ]
        })
    }

    public commands: Collection<string, CommandType> = new Collection();

    // Carrega todos os comandos
    public registerModules = async () => {
        const slashesCommand: Array<ApplicationCommandDataResolvable> = new Array();
        fs.readdirSync(path.join(__dirname, '..', 'commands')).forEach(folder => {
            fs.readdirSync(path.join(__dirname, '..', 'commands') + `/${folder}/`)
                .filter(fileName => fileName.endsWith('.ts') || fileName.endsWith('.js'))
                .forEach(async fileName => {
                    try {
                        const command: CommandType = (await import(`../commands/${folder}/${fileName}`))?.default;
                        const { name } = command;
                        if (name) {
                            this.commands.set(name, command);
                            slashesCommand.push(command);
                        }
                    } catch (error) {
                        console.log(`🔴 An error occurred when trying to import command ${fileName}: ${error}`.red);
                    }
                });
        });
        this.on('ready', async () => {
            try {
                await this.application?.commands.set(slashesCommand);
                console.log('🟢 Slashes commands defined'.green);
            } catch (error) {
                console.log('🔴 An error ocurred when trying set the slashes commands'.red);
            }
        });
    };

    // Carrega todos os eventos
    public registerEvents = async () => {
        fs.readdirSync(path.join(__dirname, '..', 'events')).forEach(local => {
            fs.readdirSync(`${path.join(__dirname, '..', 'events')}/${local}`)
                .filter(fileName => fileName.endsWith('.ts') || fileName.endsWith('.js'))
                .forEach(async fileName => {
                    const { name, once, run }: EventType<keyof ClientEvents> = (
                        await import(`../events/${local}/${fileName}`)
                    )?.default;
                    try {
                        if (name) (once) ? this.once(name, run) : this.on(name, run);
                    } catch (error) {
                        console.log(`An error occurred on event: ${name} \n${error}`.red);
                    }
                });
        });
    };

};

export { ClientBot };