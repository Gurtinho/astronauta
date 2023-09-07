import { ClientBot } from '.././client';
import {
    CommandInteractionOptionResolver, ApplicationCommandData, CommandInteraction,
} from 'discord.js';

export type ICommandsProps = {
    client: ClientBot;
    interaction: CommandInteraction;
    options: CommandInteractionOptionResolver;
};

export type CommandType = ApplicationCommandData & {
    run(props: ICommandsProps): any;
};

export class Command {
    constructor(options: CommandType) {
        return Object.assign(this, options);
    }
}