import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('configuration')
class Configuration {
    @PrimaryColumn()
    id?: string;

    @Column()
    guild: string;

    @Column()
    badwords: string;

    @Column()
    antilinks: string;

    @CreateDateColumn()
    created_at: string;

    @CreateDateColumn()
    updated_at: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Configuration };