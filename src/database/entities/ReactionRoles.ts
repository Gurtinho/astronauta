import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('reactionroles')
class ReactionRoles {
    @PrimaryColumn()
    id?: string;

    @Column()
    guild: string;

    @Column()
    channel: string;

    @Column()
    roles: string;

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

export { ReactionRoles };