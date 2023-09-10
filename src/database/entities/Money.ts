import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('money')
class Money {
    @PrimaryColumn()
    id?: string;

    @Column()
    fragments: Number;

    @Column()
    gems: Number;

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

export { Money };